const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');

dotenv.load();
const fs = require('fs');

let databaseError;

const Models = require('./models');

const { ReceiptModel, VisitModel, ProviderModel, ClinicModel } = Models;

mongoose
  .connect(
    `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`,
    { connectTimeoutMS: 1000 }
  )
  .then(
    () => {},
    err => {
      databaseError = err;
    }
  );
const db = mongoose.connection;
db.on('error', e => {
  databaseError = e;
});

exports.addProvider = async req => ProviderModel.create(req);

exports.providersByRep = async rep => {
  const allProviders = await ProviderModel.find({ rep });
  return allProviders.reduce((acc, c) => {
    const { clinic } = c;
    if (acc[clinic]) acc[clinic].push(c);
    else acc[clinic] = [c];
    return acc;
  }, {});
};

exports.getClinic = async rep =>
  ClinicModel.find(rep === 'admin' ? {} : { rep });

exports.getTotalsByRep = async rep => {
  const query = {};
  if (rep !== 'admin') query.rep = rep;

  const [repsProviders, repsClinics] = await Promise.all([
    ProviderModel.find(query),
    ClinicModel.find(query),
  ]);

  const clinicIDtoName = repsClinics.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});

  const providersIDs = repsProviders.map(p => p._id);
  const totals = await this.totalsForProviders(providersIDs, clinicIDtoName);

  const desiredReps = new Set(
    rep === 'admin' ? ['las', 'lan', 'msn', 'mss'] : [rep]
  );

  return Object.values(totals).filter(total => desiredReps.has(total.rep));
};

exports.totalsForProviders = async (providers, clinicIDtoName) => {
  const year = new Date().getFullYear();
  const min = `${year}-01-01`;
  const max = `${year}-12-31`;
  const visits = await VisitModel.find({
    date: { $gte: min, $lte: max },
    providers: {
      $in: providers,
    },
  });
  const spendingByDoctor = visits.reduce((acc, c) => {
    c.providers.forEach(p => {
      acc[p] = (acc[p] || 0) + c.amountSpent / c.providers.length;
    });
    return acc;
  }, {});

  const myProviders = await ProviderModel.find();
  myProviders.forEach(({ name, _id, rep, clinic }) => {
    const amount = spendingByDoctor[_id];
    if (amount != null) {
      spendingByDoctor[_id] = {
        amount,
        name,
        _id,
        rep,
        clinicName: clinicIDtoName[clinic],
      };
    }
  });
  return spendingByDoctor;
};

exports.addPhoto = async name =>
  ReceiptModel.create({
    name,
    img: {
      data: fs.readFileSync(`./receipts/${name}.png`),
      contentType: 'image/png',
    },
  });

exports.receipt = async _id => ReceiptModel.find({ _id });

exports.addClinic = async req => ClinicModel.create(req);

exports.spendingByDoctor = async (rep, clinic) => {
  const query = rep === 'admin' ? {} : { rep };
  const year = new Date().getFullYear();
  const min = `${year}-01-01`;
  const max = `${year}-12-31`;
  const myVisitsThisYear = await VisitModel.find({
    ...query,
    date: { $gte: min, $lte: max },
    clinic: clinic || null,
  });
  const spendingByDoctor = myVisitsThisYear.reduce((acc, c) => {
    const { providers, amountSpent } = c;
    providers.forEach(p => {
      acc[p] = (acc[p] || 0) + amountSpent / providers.length;
    });
    return acc;
  }, {});
  const myProviders = await ProviderModel.find(query);
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount !== undefined) {
      spendingByDoctor[_id] = {
        amount,
        name,
      };
    }
  });
  return spendingByDoctor;
};
exports.addVisit = async body => {
  const { _id, providers } = await VisitModel.create(body);
  if (_id) {
    const emailResult = await exports.checkMaxAndEmail(
      body.rep,
      await this.totalsForProviders(providers),
      body
    );
    return { _id, email: emailResult };
  }
  return 'db create failed';
};

const emailByRep = {
  mss: 'sizdepski@physiciansgrouplaboratories.com',
  msn: 'jbarre@physiciansgrouplaboratories.com',
  lan: 'hbroussard@getpgl.com',
  las: 'bbauder@physiciansgrouplaboratories.com',
  andrewtest: 'ayeates@physiciansgrouplaboratories.com',
};
const j = 'j.metevier+pglapp@gmail.com';
emailByRep.test = j;
emailByRep.jack = j;

const sendEmail = (providers, rep, { clinicName, amountSpent }) =>
  providers.map(ar => {
    const { amount: totalForYear, name } = Array.isArray(ar) && ar[1];
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const addresses = [emailByRep[rep]];
    if (!addresses.length) {
      if (process.env.NODE_ENV !== 'PRODUCTION') {
        throw new Error('no email address');
      }
    }
    const msg = {
      to: addresses,
      from: 'PGL_Monitoring_app@pgl.com',
      subject: 'Approaching provider spending limit',
      html: `<div>Rep ${rep} just spent $${amountSpent} on ${name} at ${clinicName}. This brings total spending for ${name} to $${totalForYear}. </div>`,
    };
    if (totalForYear > 399) {
      msg.subject = 'Exceeded provider spending limit';
      msg.to.push(process.env.BOSS_EMAIL);
    }
    sgMail.send(msg);
    return msg;
  });

exports.checkMaxAndEmail = async (rep, spendingByDoctor, newVisit) => {
  const maxSpend = 350;
  const overLimit = [];
  Object.entries(spendingByDoctor).forEach(([key, value]) => {
    if (value.amount > maxSpend) {
      overLimit.push([key, value]);
    }
  });
  return overLimit.length
    ? sendEmail(overLimit, rep, newVisit)
    : 'no email sent';
};

exports.getVisits = async rep => {
  const repToUse = rep === 'admin' ? {} : { rep };
  return VisitModel.find(repToUse);
};

exports.getVisitsThisYear = async rep => {
  const year = new Date().getFullYear();
  const query = {
    date: { $gte: `${year}-01-01`, $lte: `${year}-12-31` },
  };
  if (rep !== 'admin') query.rep = rep;
  return VisitModel.find(query);
};

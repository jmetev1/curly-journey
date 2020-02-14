const mongoose = require('mongoose');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
dotenv.load();
var fs = require('fs');
let databaseError;

const Models = require('./models');
const {
  ReceiptModel,
  VisitModel,
  ProviderModel,
  ClinicModel,
  UserModel,
} = Models;

mongoose
  .connect(
    `mongodb://cain:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`,
    { connectTimeoutMS: 1000 }
  )
  .then(
    suc => {},
    err => (databaseError = err)
  );
const db = mongoose.connection;
db.on('error', e => (databaseError = e));

exports.addProvider = async (req, res, cb) => await ProviderModel.create(req);
exports.addUser = async body => {
  return await UserModel.create(body);
};
exports.providersByRep = async rep => {
  const allProviders = await ProviderModel.find({ rep });
  return allProviders.reduce((a, c) => {
    const { clinic } = c;
    if (a[clinic]) a[clinic].push(c);
    else a[clinic] = [c];
    return a;
  }, {});
};

exports.getClinic = async rep => {
  return await ClinicModel.find(rep === 'admin' ? {} : { rep });
};

exports.totalsForProviders = async providers => {
  const year = new Date().getFullYear();
  const min = year + '-01-01',
    max = year + '-12-31';
  const visits = await VisitModel.find({
    date: { $gte: min, $lte: max },
    providers: {
      $in: providers,
    },
  });
  const spendingByDoctor = visits.reduce((a, c) => {
    const { providers, amountSpent } = c;
    providers.forEach(p => {
      a[p] = (a[p] || 0) + amountSpent / providers.length;
    });
    return a;
  }, {});

  const myProviders = await ProviderModel.find();
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount)
      spendingByDoctor[_id] = {
        amount,
        name,
      };
  });
  return spendingByDoctor;
};

exports.addPhoto = async (name, req, res) =>
  await ReceiptModel.create({
    name,
    img: {
      data: fs.readFileSync(`./receipts/${name}.png`),
      contentType: 'image/png',
    },
  });

exports.receipt = async (_id, req, res) => await ReceiptModel.find({ _id });

exports.addClinic = async (req, res, cb) => await ClinicModel.create(req);

exports.spendingByDoctor = async (rep, clinic) => {
  const query = rep === 'admin' ? {} : { rep };
  const year = new Date().getFullYear();
  const min = year + '-01-01';
  const max = year + '-12-31';
  const myVisitsThisYear = await VisitModel.find({
    ...query,
    date: { $gte: min, $lte: max },
    clinic: clinic || null,
  });
  const spendingByDoctor = myVisitsThisYear.reduce((a, c) => {
    const { providers, amountSpent } = c;
    providers.forEach(p => {
      a[p] = (a[p] || 0) + amountSpent / providers.length;
    });
    return a;
  }, {});
  const myProviders = await ProviderModel.find(query);
  myProviders.forEach(({ name, _id }) => {
    const amount = spendingByDoctor[_id];
    if (amount !== undefined)
      spendingByDoctor[_id] = {
        amount,
        name,
      };
  });
  return spendingByDoctor;
};
exports.addVisit = async (body, res, cb) => {
  const { _id, providers } = await VisitModel.create(body);
  if (_id) {
    const emailResult = await exports.checkMaxAndEmail(
      body.rep,
      await this.totalsForProviders(providers),
      body
    );
    return { _id, email: emailResult };
  } else return 'db create failed';
};
exports.checkMaxAndEmail = async (rep, spendingByDoctor, newVisit) => {
  const maxSpend = 350;
  const overLimit = [];
  for (let [key, value] of Object.entries(spendingByDoctor)) {
    if (value.amount > maxSpend) overLimit.push([key, value]);
  }
  return overLimit.length
    ? await sendEmail(overLimit, rep, newVisit)
    : 'no email sent';
};

const emailByRep = {
  mss: 'sizdepski@physiciansgrouplaboratories.com',
  msn: 'jbarre@physiciansgrouplaboratories.com',
  lan: 'hbroussard@getpgl.com',
  las: 'bbauder@physiciansgrouplaboratories.com',
  andrewtest: 'ayeates@physiciansgrouplaboratories.com',
};
emailByRep.test = emailByRep.jack = 'j.metevier+pglapp@gmail.com';

const sendEmail = (providers, rep, { clinicName, amountSpent }) => {
  return providers.map(ar => {
    const { amount: totalForYear, name } = Array.isArray(ar) && ar[1];
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const addresses = [emailByRep[rep]];
    if (!addresses.length) {
      if (process.env.NODE_ENV !== 'PRODUCTION')
        throw new Error('no email address');
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
};

exports.getVisits = async rep => {
  rep = rep === 'admin' ? {} : { rep };
  return await VisitModel.find(rep);
};

exports.getVisitsThisYear = async rep => {
  const year = new Date().getFullYear();
  const query = {
    date: { $gte: year + '-01-01', $lte: year + '-12-31' },
  };
  if (rep !== 'admin') query.rep = rep;
  return await VisitModel.find(query);
};

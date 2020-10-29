const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

const buildDir = path.join(__dirname, '..', 'build');

dotenv.load();
const development = process.env.NODE_ENV === 'development';
const reload = development ? require('reload') : 'n';

if (!development) app.use(express.static(buildDir));
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const fileupload = require('express-fileupload');
const aws = require('./aws');

const store = new MongoDBStore(
  {
    uri: `mongodb://${process.env.DBusername}:${process.env.DBPW}@ds127783.mlab.com:27783/poolmap`,

    databaseName: 'poolmap',
    collection: 'mySessions',
  },
  (err) => {
    console.log(' session store err', err);
  }
);
store.on('error other', (error) => {
  console.log(error);
});
const db = require('./db');

app.set('port', process.env.PORT || 3000);
app.use(
  session({
    name: 'server-session-cookie-id',
    secret: 'my express secret',
    store,
    saveUninitialized: true,
    resave: false,
  }),
  fileupload(),
  bodyParser.json()
);

app.get('/api/totalsForProviders', async (req, res) => {
  const totals = await db.getTotalsByRep(req.session.rep);
  res.json(totals.sort(({ amount }, b) => b.amount - amount));
});

app.options('/api/login', cors());

app.get('/api/login', cors(), async (req, res) => {
  const { rep } = req && req.session;
  const details = await db.getUser(rep);
  if (rep) {
    res.json(details);
  } else {
    res.json(false);
  }
});

app.post('/api/sign', async (req, res) => {
  const { id, status } = req.body;
  res.json(await db.sign(req.session.rep, status, id));
});

app.get('/api/logout', cors(), (req, res) => {
  req.session.rep = null;
  res.send(JSON.stringify('ok'));
});

app.post('/api/login', cors(), async (req, res) => {
  const { username, password } = req.body;
  if (process.env[username] === password) {
    const rep = username;
    req.session.rep = username;
    res.json(await db.getUser(rep));
  } else {
    res.json(false);
  }
});

app.options('/api/visit', cors());

app.get('/api/visits', cors(), async (req, res) => {
  res.json(await db.getVisits(req.session.rep));
});

app.options('/api/clinic', cors());

app.options('/api/provider', cors());
app.get('/api/getproviders', cors(), async (req, res) => {
  res.json(await db.providersByRep(req.session.rep));
});

app.get('/api/getSpendingByDoctor/:clinicID', cors(), async (req, res) => {
  res.json(await db.spendingByDoctor(req.session.rep, req.params.clinicID));
});

app.post('/api/provider', cors(), async ({ body, ...rest }, res) => {
  res.json(
    await db.addProvider({
      ...body,
      rep: rest.session.rep,
    })
  );
});

let name = '0.8708915141890314';

app.post('/api/receipt', async (req, res, next) => {
  name = 's3';
  name += Math.random().toString();
  const pathToFile = `./receipts/${name}.png`;
  req.files.myFile.mv(pathToFile, async (err) => {
    if (err) next(err);
    await aws.addPhoto(name).then(({ key, cb }) => {
      cb.then(
        (data) => {
          console.log({ key });
          if (data) res.json(key);
        },
        (error) => {
          if (error) res.json(error);
        }
      ).catch((error) => {
        if (error) res.json(error);
      });
    });
  });
});

// Are req res and next needed?
/* eslint-disable no-unused-vars */
app.get('/api/error', (req, res, next) => {
  throw new Error('This is an error and it should be logged to the console');
});

const getMlab = async (id) => {
  const [doc] = await db.receipt(id);
  if (doc) {
    return {
      ContentType: doc.img.contentType,
      Body: doc.img.data
    };
  }
  return null;
};

const getS3 = async (id) => {
  const file = await aws.receipt(id);
  if (file) return file;
  return null;
};

// TODO: Handle nonexistent photo (instead of throwing error)
// Must run async or throws error because doc is not yet defined
// Running very slow, why??
app.get('/api/receipt/:receiptID', async (req, res, next) => {
  const { receiptID } = req.params;
  const s3 = receiptID.substring(0, 2) === 's3';

  // Find a better way to handle this switch
  const file = await (s3 ? getS3 : getMlab)(receiptID);
  if (file) {
    res.contentType(file.ContentType);
    res.send(file.Body);
  } else {
    res.send('Image not found');
  }
});

app.post('/api/visit', cors(), async (req, res) => {
  const addVisitResult = await db.addVisit({
    ...req.body,
    rep: req.session.rep,
    photoLocation: 's3',
  });
  res.json(addVisitResult);
});

app.post('/api/clinic', cors(), async (req, res) =>
  res.json(
    await db.addClinic({
      ...req.body,
      rep: req.session.rep,
    })
  )
);

app.get('/api/clinic', cors(), async (req, res) => {
  const allClinics = await db.getClinic(req.session.rep);
  res.send(JSON.stringify(allClinics));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  if (err) console.log('middleware', err);
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

const server = http.createServer(app);

if (development) {
  reload(app)
    .then(() => {
      server.listen(app.get('port'), () => {
        console.log(`Web server listening on port ${app.get('port')}`);
      });
    })
    .catch((err) => {
      console.error(
        'Reload could not start, could not start server/sample app',
        err
      );
    });
} else {
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'));
  });

  server.listen(app.get('port'), () => {
    console.log(`Web server listening on port ${app.get('port')}`);
  });
}

module.exports = app;

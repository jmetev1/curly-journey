const supertest = require('supertest');
const test = require('unit.js');
const app = require('../server.js');

const request = supertest(app);

// describe('Tests app', function () {
//   it('verifies get', function (done) {
//     request.get('/').expect(200).end(function (err, result) {
//       console.log(12, err)
//       test.string(result.text).contains('root');
//       test.value(result).hasHeader('content-type', 'text/html; charset=UTF-8');
//       done(err);
//     });
//   });
// });

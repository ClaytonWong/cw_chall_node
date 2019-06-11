//var request = require("supertest");
//var should = require("should");
var expect = require('chai').expect;
const zendesk = require("../api/zendesk");
const app = zendesk.getFromAPI;

/*
describe('GET', function() {
  it('responds', function() {
    return request(app)
      .get('tickets.json?page=1&per_page=25')
      .set('Accept', 'application/json')
      //.expect('Content-Type', /json/)
      //.expect(200)
      .then(response => {
          assert(response.data.count, 101)
      })
  });
});
*/

describe('GET tickets.json', function () {
  it('respond with json ', function (done) {
      request(app)
          .get('tickets/1.json')
          //.set('Accept', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(404, done);
  });
});
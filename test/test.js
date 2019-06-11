var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const zendesk = require("../api/zendesk");
const app = zendesk.getFromAPI;

// Check if there are 101 tickets in account as of Tue 2019 Jun 11
it('should do something with promises', function() {
  var value = app('tickets.json')

  return expect(value.then(o => o.data.count)).to.eventually.equal(101);
});

it('should do something with promises test 2', function() {
  var value = app('tickets.json')

  return expect(value.then(o => o.data.count)).to.eventually.not.equal(102);
});
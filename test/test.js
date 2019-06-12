var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const zendesk = require("../api/zendesk");
const req = require("../request");
const app = zendesk.getFromAPI;

// Check if there are 101 tickets in account as of Tue 2019 Jun 11
// it('should do something with promises', function() {
//   var value = app('tickets.json');

//   return expect(value.then(o => o.data.count)).to.eventually.equal(101);
// });

// it('should do something with promises test 2', function() {
//   var value = app('tickets.json');

//   return expect(value.then(o => o.data.count)).to.eventually.not.equal(102);
// });


// Test getNumOfTickets function from request.js
// const getTicketCount = req.getNumOfTickets;

// it('Number of tickets should equal 101', function() {
//   var value = getTicketCount();

//   return expect(value.then()).to.eventually.equal(101);
// });

// it('Number of tickets should not equal 102', function() {
//   var value = getTicketCount();

//   return expect(value.then()).to.eventually.not.equal(102);
// });


// Test getFromZendeskAPI function from request.js
const getFromZendeskAPI = req.getFromZendeskAPI;
let pageNum = 1;
let ticketsPerPage = 25;

it('1 page should have a maximum of 25 tickets', function() {
  // Test part of pageThroughTickets and listTickets functions from request.js
  var value = getFromZendeskAPI(`tickets.json?page=${pageNum}&per_page=${ticketsPerPage}`);

  return expect(value.then(o => o.data.tickets.length)).to.eventually.equal(25);
});

it('1 page should not have a maximum of 26 tickets', function() {
  var value = getFromZendeskAPI(`tickets.json?page=${pageNum}&per_page=${ticketsPerPage}`);

  return expect(value.then(o => o.data.tickets.length)).to.eventually.not.equal(26);
});
const zendesk = require('./api/zendesk');

function getFromZendeskAPI(restOfURL) {
  let promise = zendesk.getFromAPI(restOfURL)
    .then(res => {
      return res;
    })
    .catch((error) => {
      console.log('error from .catch in getFromZendeskAPI definition: ', error);
    })
  return promise;
};

function pageThroughTickets(pageNum, ticketsPerPage) {
  
  // Make request for a page of tickets, starting from pageNum
  getFromZendeskAPI(`tickets.json?page=${pageNum}&per_page=${ticketsPerPage}`)
  .then(res => {
    var page = res.data;
    console.log(page); // Show tickets on current page

    if(page["next_page"] === null) {
      console.log('Next page is null.');
    }
    else {
      console.log('There is a next page.');
      pageThroughTickets(pageNum + 1, ticketsPerPage); // Make request for next page if it's available
    }
  })
  .catch((error) => {
    console.log(`error from .catch in getFromZendeskAPI for page${pageNum}: `, error);
  })
};

function listTickets(pageNum, ticketsPerPage) {
  
  // Make request for tickets on pageNum
  getFromZendeskAPI(`tickets.json?page=${pageNum}&per_page=${ticketsPerPage}`)
  .then(res => {
    var tickets = res.data.tickets;
    
    console.log('');
    console.log('');
    console.log(`Tickets on page ${pageNum}`);
    console.log('-----------------');

    // Show ID and subject for tickets on current page
    tickets.forEach(ticket => {
      console.log(`ID: ${ticket.id}, Subject: ${ticket.subject}`);
    })
    console.log('');
  })
  .catch((error) => {
    console.log(`error from .catch in getFromZendeskAPI for page${pageNum}: `, error);
  })
};

function showDetailsForOneTicket(id) {
  getFromZendeskAPI(`tickets/${id}.json`) // Request json for ticket that matches id given
  .then(res => {
    var ticket = res.data.ticket;

    console.log('');
    console.log('');
    console.log('Details for ticket:');
    console.log('-------------------');
    console.log(`ID: ${ticket.id}`);
    console.log(`Created at: ${ticket.created_at}`);
    console.log(`Updated at: ${ticket.updated_at}`);
    console.log(`Subject: ${ticket.subject}`);
    console.log('Description:');
    console.log(ticket.description);
    console.log('');
  })
  .catch((error) => {
    console.log(`error from .catch in getFromZendeskAPI for ticket with id${id}: `, error);
  })
};

function getNumOfTickets() {
  
  // Make request for a tickets.json
  let promise = zendesk.getFromAPI(`tickets.json`)
  .then(res => {
    var count = res.data["count"]; // Find ticket count then return it
    
    return count;
  })
  .catch((error) => {
    console.log(`error from .catch in getNumOfTickets: `, error);
  })

  return promise;
};

// Test values
//let pageNum = 1;
let ticketsPerPage = 25;

// Test function showDetailsForOneTicket to print details for ticket with id of 1
//showDetailsForOneTicket(1);

// Test function for paging through tickets, starting from page 1, with 25 tickets per page
//pageThroughTickets(pageNum, ticketsPerPage);

// list some info on tickets on page 1
//listTickets(pageNum, ticketsPerPage);

// Test function for getting ticket count
//console.log( getNumOfTickets().then() );

module.exports = {
  getFromZendeskAPI: getFromZendeskAPI,
  pageThroughTickets: pageThroughTickets,
  listTickets: listTickets,
  showDetailsForOneTicket: showDetailsForOneTicket,
  getNumOfTickets: getNumOfTickets,
  ticketsPerPage: ticketsPerPage
};
const zendesk = require('./api/zendesk');

function getFromZendeskAPI(restOfURL) {
  let promise = zendesk.getFromAPI(restOfURL)
    .then(res => {
      return res;
    })
    .catch((error) => {
      console.log('error from .catch in getFromZendeskAPI definition: ');
      explainError(error);
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
    console.log(`error from .catch in getFromZendeskAPI for page${pageNum}: `);
    explainError(error);
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
    console.log(`error from .catch in getFromZendeskAPI for page${pageNum}: `);
    explainError(error);
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
    console.log(`error from .catch in getFromZendeskAPI for ticket with id of ${id}: `);
    explainError(error);
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
    console.log(`error from .catch in getNumOfTickets: `);
    explainError(error);
  })

  return promise;
};

function explainError(error) {
  console.log(`status: ${error.response.status}`);
  console.log(`statusText: ${error.response.statusText}`);
  console.log(`Data: ${error.response.data.error}`);

  let statusCode = error.response.status;

  switch(statusCode) {
    case 400:
      console.log('Bad request, often due to missing a required parameter.');
      break;
    case 401:
      console.log('No valid API key provided. Or');
      console.log('subdomain, username and/or password incorrect');
      break;
    case 403:
      console.log('The server understood the request, but is refusing to fulfill it.');
      break;
    case 404:
      console.log('The server has not found anything matching the Request-URI. No indication is given of whether the condition is temporary or permanent. ');
      break;
    case 500:
      console.log('The server encountered an unexpected condition which prevented it from fulfilling the request.');
      break;
    case 501:
      console.log('The server does not support the functionality required to fulfill the request.');
      break;
    case 502:
      console.log('The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.');
      break;
  }

  console.log('');
}

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
  explainError:explainError,
  ticketsPerPage: ticketsPerPage
};
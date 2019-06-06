const zendesk = require('./api/zendesk')

function getFromZendeskAPI(restOfURL) {
  let promise = zendesk.getFromAPI(restOfURL)
    .then(res => {
      return res
    })
    .catch((error) => {
      console.log('error from .catch in getFromZendeskAPI definition: ', error)
    })
  return promise
}

function pageThroughTickets(pageNum, ticketsPerPage) {
  
  // Make request for a page of tickets, starting from pageNum
  getFromZendeskAPI(`tickets.json?page=${pageNum}&per_page=${ticketsPerPage}`)
  .then(res => {
    var page = res.data
    console.log(page) // Show tickets on current page

    if(page["next_page"] === null) {
      console.log('Next page is null.')
    }
    else {
      console.log('There is a next page.')
      pageThroughTickets(pageNum + 1, ticketsPerPage) // Make request for next page if it's available
    }
  })
  .catch((error) => {
    console.log(`error from .catch in getFromZendeskAPI for page${pageNum}: `, error)
  })
}
// Test function for paging through tickets, starting from page 1, with 25 tickets per page
/*
let pageNum = 1
let ticketsPerPage = 25
pageThroughTickets(pageNum, ticketsPerPage)
*/


function showDetailsForOneTicket(id) {
  getFromZendeskAPI(`tickets/${id}.json`) // Request json for ticket that matches id given
  .then(res => {
    var ticket = res.data.ticket

    console.log('Details for ticket:')
    console.log('-------------------')
    console.log(`ID: ${ticket.id}`)
    console.log(`Created at: ${ticket.created_at}`)
    console.log(`Updated at: ${ticket.updated_at}`)
    console.log(`Subject: ${ticket.subject}`)
    console.log('Description:')
    console.log(ticket.description)
  })
  .catch((error) => {
    console.log(`error from .catch in getFromZendeskAPI for ticket with id${id}: `, error)
  })
}

// Test function showDetailsForOneTicket to print details for ticket with id of 1
showDetailsForOneTicket(1)
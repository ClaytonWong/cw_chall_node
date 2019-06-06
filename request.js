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


function x(id) {
  getFromZendeskAPI(`tickets/${id}.json`)
  .then(res => {
    var ticket = res.data
    console.log(ticket) // Show json for ticket
  })
  .catch((error) => {
    console.log(`error from .catch in getFromZendeskAPI for ticket with id${id}: `, error)
  })
}

x(1)
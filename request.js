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

let page1_25ticketsPerPageUrl = 'tickets.json?page=1&per_page=25'
getFromZendeskAPI(page1_25ticketsPerPageUrl)
  .then(res => {
    var page = res.data
    console.log(page)

    if(page["next_page"] === null) {
      console.log('next page is null')
    }
    else {
      console.log('there is a next page')
    }
  })
  .catch((error) => {
    console.log('error from .catch in getFromZendeskAPI for page: ', error)
  })
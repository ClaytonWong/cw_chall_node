const zendesk = require('./api/zendesk')

function getFromZendeskAPI(restOfURL) {
  zendesk.getFromAPI(restOfURL)
    .then(res => {
      var page = res.data
      console.log(page.count);
    })
    .catch((error) => {
      console.log('error from .catch in getFromZendeskAPI definition: ', error)
    })
}

getFromZendeskAPI('tickets.json?per_page=25');
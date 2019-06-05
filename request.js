const zendesk = require('./api/zendesk')

function getRequest(restOfURL) {
  zendesk.getReq(restOfURL)
    .then(res => {
      var page = res.data
      console.log(page);
    })
    .catch((error) => {
      console.log('error from .catch in getRequest definition: ', error)
    })
}

getRequest('tickets/1');
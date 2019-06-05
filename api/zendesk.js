// Get environment variables from separate files
const authstuff = require('./authStuff.js');
const subdomain = require('./subdomain.js');

// Use Axios HTTP client to work with apis and base-64 to get base64 numbers
const axios = require('axios')
const Base64 = require('base-64')

// Prepare to authenticate
const tok = `${authstuff.username}:${authstuff.password}`;
const hash = Base64.encode(tok);

// Set config defaults when creating the instance
const zendesk = axios.create({
  baseURL: `https://${subdomain.subdomain}.zendesk.com/api/v2/`,
  headers: {
    Authorization: `Basic ${hash}`
  }
})

function getFromAPI(restOfURL) {
  return zendesk.get(restOfURL)
}

module.exports = { getFromAPI }
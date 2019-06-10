// Use Axios HTTP client to work with apis and base-64 to get base64 numbers
const axios = require('axios');
const Base64 = require('base-64');

// Get environment variables from .env file
if (process.env.NODE_ENV !== 'production') { // If not in production environment
  require('dotenv').config(); // Load the .env file in the root of project and initialize the values. 
};
const subdomain = process.env.subdomain;
const username = process.env.username;
const password = process.env.password;

// Prepare to authenticate
const tok = `${username}:${password}`;
const hash = Base64.encode(tok);

// Set config defaults when creating the instance
const zendesk = axios.create({
  baseURL: `https://${subdomain}.zendesk.com/api/v2/`,
  headers: {
    Authorization: `Basic ${hash}`
  }
});

function getFromAPI(restOfURL) {
  return zendesk.get(restOfURL);
};

module.exports = { getFromAPI }
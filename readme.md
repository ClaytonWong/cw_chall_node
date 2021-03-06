# Zendesk ticket viewer

## Introduction
This Zendesk ticket viewer is for the coding challenge for the Software Engineering
Internship in Melbourne Australia, which was advertised on 16 May 2019.

The programming language used for my solution was Node.js (version 10.16.0).
My reason for using is because it is the programming language that I'm most familiar
with at this time.
Node.js ver 10.16.0 can be downloaded from it's official site:

  https://nodejs.org/en/

## Requirements

### Installing yarn
Yarn is the package manager I used for Node. It can be downloaded at their official site:

  https://yarnpkg.com/en/

### Installing the project
1) In github, click on the green "clone or download" button
2) Choose "download zip" in the dropdown menu under the button
3) Choose destination for download
4) Extract the zip file in the directory of your choice
5) Open up a command line or terminal window
6) In command line or terminal window, go to directory where you extracted the zip file

### Node packages
The project requires the following Node packages:

#### Axios
Axios makes it easier for you to work with APIs.
To get Axios type in the following at the command line:

If you use yarn, type:

  yarn add axios

If you use npm, type:

  npm install axios

The Github repo for Axios is at the link:

  https://github.com/axios/axios

#### base-64
'base-64' lets you encode base64 numbers for authentication.
To get base-64 type in the following at the command line:

If you use yarn, type:

  yarn add base-64

If you use npm, type:

  npm install base-64

#### dotenv
'dotenv' lets you use .env files for environment variables.
To get dotenv type in the following at the command line:

If you use yarn, type:

  yarn add dotenv

If you use npm, type:

  npm install dotenv

#### inquirer
'inquirer' makes it easier for you to get user input from the keyboard, create menus and work with them.
To get inquirer type in the following at the command line:

If you use yarn, type:

  yarn add inquirer

If you use npm, type:

  npm install inquirer

#### Mocha
Mocha is a JavaScript test framework. To get it from the commandline, type in the following:

If you use yarn, type:

  yarn add mocha

If you use npm, type:

  npm install mocha

#### Chai
Chai is a Behavioral Driven Developoment / Test Driven Development assertion library for node and the browser. To get it from the commandline, type in the following:

If you use yarn, type:

  yarn add chai

If you use npm, type:

  npm install chai

#### chai-as-promised
Chai as Promised extends Chai with a fluent language for asserting facts about promises. To get it from the commandline, type in the following:

If you use yarn, type:

  yarn add chai-as-promised

If you use npm, type:

  npm install chai-as-promised

### Creating a .env file
You need to create a .env file in the root directory of the project for it to run.
In the .env file, type in the following:

```javascript
  subdomain = SUBDOMAIN
  username = USERNAME
  password = PASSWORD
```
SUBDOMAIN, USERNAME and PASSWORD should be replaced with the subdomain, username and password that you want to use.

## How to use the Zendesk ticket viewer
At the commandline, in the directory where you extracted the zip file, type in the following:

  node ticketViewerMenu.js

This will put you in the main menu of the ticket viewer. Use the arrow keys to select one of the following:
* 'Page through tickets', this will page through the JSON objects for all the tickets, where there are 25   
  JSON objects per page.  
* 'List tickets for a page', this will list tickets on pages available, it will take you to a prompt
  that will tell you how many pages are availablew then ask you to either
  * Type in a page number to list tickets for
  * Type in 'back' to go back to the main menu
  * Or type in 'exit' to exit the ticket viewer
  A valid page number is an integer from 1 to the number of pages available. Type in a valid page number, 'back', or 'exit' then press enter to carry out desired action.
* 'Show details for 1 ticket', this will take you to a prompt that will then tell you how many tickets are  
   available followed by range of ticket IDs, then ask you to either
  * Type in a ticket ID number to show details for
  * Type in 'back' to go to main menu
  * Or 'exit' to exit the ticket viewer
  A valid ID is one that is in the range. Type in a valid ticket ID number, 'back', or 'exit' then press enter to carry out desired action.
* 'exit', this will exit the ticket viewer.

## How to test ticket viewer using Mocha, Chai & chai-as-promised
At the commandline, in the directory where you extracted the zip file, type in the following:

  yarn test

This will run the test script in the package.json file. That test script will run the file test.js in the test subdirectory.

## Design and implementation decisions, including changes
### Brief description of overall design and/or how the ticket viewer works
The ticket viewer basically works by calling the Zendesk API to ask for various information, such as details for a ticket.

To enable calls to the Zendesk API, an instance is created. This is done using the subdomain to create a baseURL and a base64 encoded string formed by the username and password for the subdomain.

To get various information from the Zendesk API, the rest of the URL needs to be given when doing the API call.

What you or the user wants from the API will determine what the rest of the URL will be. For example, if you want the details of the ticket with the ID of 1, the rest of the URL will be 'tickets/1.json'

The user input given at the menu and commandline prompts will be used to form the string that makes up the rest of the URL for the API call.

### Storing of credentials
Originally, the subdomain was stored in a separate file called subdomain.js, and the username and password were stored in the file authStuff.js. Both of those files were in the .gitignore file so that they will not
be put into Github.
subdomain.js contains the following:
```javascript
const subdomain = 'SUBDOMAIN';

module.exports = {
  subdomain: subdomain
};
```
authStuff.js has the following:
```javascript
const username = 'USERNAME';
const password = 'PASSWORD';

module.exports = {
  username: username, 
  password: password
};
```
To import the subdomain, username and password, the following code was used in zendesk.js:
```javascript
// Get environment variables from separate files
const authstuff = require('./authStuff.js');
const subdomain = require('./subdomain.js');
```
To prepare for authentication and create an instance, I originally used the following code:
```javascript
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
```

Inorder to reduce the amount of code, I later decided to use a .env file to store the subdomain, username and password. The .env is also included in the .gitignore file. The dotenv Node module also had to be added.
To bring in the subdomain, username and password from the .env file, the following code was used in zendesk.js
```javascript
// Get environment variables from .env file
if (process.env.NODE_ENV !== 'production') { // If not in production environment
  require('dotenv').config(); // Load the .env file in the root of project and initialize the values. 
}
const subdomain = process.env.subdomain
const username = process.env.username
const password = process.env.password
```
The code to prepare for authentication and creating an instance was changed to the following in zendesk.js
```javascript
// Prepare to authenticate
const tok = `${username}:${password}`;
const hash = Base64.encode(tok);

// Set config defaults when creating the instance
const zendesk = axios.create({
  baseURL: `https://${subdomain}.zendesk.com/api/v2/`,
  headers: {
    Authorization: `Basic ${hash}`
  }
})
```
### Getting user input from keyboard and commandline and working with it
At first, I tried creating menu systems in a separate file using 'readline' and 'process.stdin'. But they do not work well, for example, it would quit the program after you make a choice. Eventually, I found the package 'inquirer' which allowed me to create better commandline interfaces.

### Handling errors from .catch
Instead of showing a large amount of error messages that most people can't understand, I decided to pick
out certain parts of the error object and showing that, then show other brief error messages depending
on the status code returned.

## Problems encounted and rough solutions
A list of problems I encounted with rough solutions in diary format are contained in the file:

problemsAndSolutionsDiary.txt
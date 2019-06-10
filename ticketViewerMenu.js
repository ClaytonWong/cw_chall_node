'use strict';
var inquirer = require('inquirer');
var request = require('./request.js');

let pageNum;

var mainPrompt = {
  type: 'list',
  name: 'main',
  message: 'What would you like to do? (Choose something then press enter.)',
  choices: ['Page through tickets', 'List tickets for a page', 'Show details for 1 ticket', 'Exit']
};

function mainMenu() {
  inquirer.prompt(mainPrompt).then(answers => {
    if (answers.main === 'Page through tickets') {
      // Page through tickets, starting from page 1, with 25 tickets per page
      pageNum = 1;
      request.pageThroughTickets(pageNum, request.ticketsPerPage);;
      mainMenu();
    }
    else if (answers.main === 'List tickets for a page') {
      console.log('Going to list tickets part.');
      listTickets();
    }
    else if (answers.main === 'Show details for 1 ticket') {
      console.log('Going to show details part.');
      showDetailsForOneTicket();
    } 
    else { // Exit
      console.log('Good bye.');
    }
  });
};

var listTicketsPrompt = {
  type: 'input',
  name: 'listTicketsInput',
  message: 'Type in a page number to list tickets for, or \'back\' to goto main menu, or \'exit\' to exit, then press enter.'
};

function listTickets()
{ 
  let pageCount;

  request.getNumOfTickets() 
  .then(res => {
    let ticketCount = res; // Find ticket count

    /* Page count is number of tickets divided by tickets per page rounded up to the nearest integer */
    pageCount = Math.ceil( ticketCount / request.ticketsPerPage );
    
    console.log(`${pageCount} pages of tickets available.`);
  })
  .catch((error) => {
    console.log(`error from .catch in getNumOfTickets: `, error);
  })
  
  inquirer.prompt(listTicketsPrompt).then(answers => {
    if(answers.listTicketsInput === 'back') {
      console.log('Going to main menu.');
      mainMenu();
    }
    else if(answers.listTicketsInput === 'exit') {
      console.log('Good bye.');
    }
    else{
      let myInt = parseInt(answers.listTicketsInput);
      
      if( myInt == NaN) {
        console.log('Please enter a valid page number, or \'back\' to goto main menu, or \'exit\' to exit');
      }
      else {
        if(myInt < 1 || myInt > pageCount) {
          console.log('Invalid page requested.');
        }
        else {
          request.listTickets(myInt, request.ticketsPerPage);
        }
      }
      
      listTickets();
    }
  });
}

var showTicketDetailsPrompt = {
  type: 'input',
  name: 'showTicketDetailsInput',
  message: 'Type in a ticket ID number to show details for, or \'back\' to goto main menu, or \'exit\' to exit, then press enter.'
};

function showDetailsForOneTicket()
{ 
  let ticketCount;

  request.getNumOfTickets() 
  .then(res => {
    ticketCount = res; // Find ticket count

    console.log(`${ticketCount} tickets available. Ticket IDs range from 1 to ${ticketCount}.`);
  })
  .catch((error) => {
    console.log(`error from .catch in getNumOfTickets: `, error);
  })
  
  inquirer.prompt(showTicketDetailsPrompt).then(answers => {
    if(answers.showTicketDetailsInput === 'back') {
      console.log('Going to main menu.');
      mainMenu();
    }
    else if(answers.showTicketDetailsInput === 'exit') {
      console.log('Good bye.');
    }
    else{
      let myInt = parseInt(answers.showTicketDetailsInput);
      
      if( myInt == NaN) {
        console.log('Please enter a valid ticket ID number, or \'back\' to goto main menu, or \'exit\' to exit');
      }
      else {
        if(myInt < 1 || myInt > ticketCount) {
          console.log('Invalid ticket requested.');
        }
        else {
          request.showDetailsForOneTicket(myInt);
        }
      }
      
      showDetailsForOneTicket();
    }
  });
}
mainMenu();
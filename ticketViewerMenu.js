'use strict';
var inquirer = require('inquirer');
var request = require('./request.js');

let pageNum;

var mainPrompt = {
  type: 'list',
  name: 'main',
  message: 'What would you like to do?',
  choices: ['Page through tickets', 'Goto sub menu', 'Exit']
};

function mainMenu() {
  inquirer.prompt(mainPrompt).then(answers => {
    if (answers.main === 'Page through tickets') {
      // Page through tickets, starting from page 1, with 25 tickets per page
      pageNum = 1;
      request.pageThroughTickets(pageNum, request.ticketsPerPage);;
      mainMenu();
    }
    else if (answers.main === 'Goto sub menu') {
      console.log('Going to sub menu.');
      subMenu();
    } 
    else { // Exit
      console.log('Good bye.');
    }
  });
};

var subMenuPrompt = {
  type: 'input',
  name: 'sub',
  message: 'Type in an integer to be added to 1, type in \'back\' to goto main menu, or \'exit\' to exit'
};

function subMenu()
{
  inquirer.prompt(subMenuPrompt).then(answers => {
    if(answers.sub === 'back') {
      console.log('Going to main menu.');
      mainMenu();
    }
    else if(answers.sub === 'exit') {
      console.log('Good bye.');
    }
    else{
      let myInt = parseInt(answers.sub);
      let result = myInt + 1;
      console.log(`Final result is ${result}`);
      subMenu();
    }
  });
}
mainMenu();
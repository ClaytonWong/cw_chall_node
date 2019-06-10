'use strict';
var inquirer = require('inquirer');

var mainPrompt = {
  type: 'list',
  name: 'main',
  message: 'What would you like to do?',
  choices: ['Goto sub menu', 'Do action 2', 'Exit']
};

function mainMenu() {
  inquirer.prompt(mainPrompt).then(answers => {
    if (answers.main === 'Goto sub menu') {
      console.log('Going to sub menu.');
      subMenu();
    } 
    else if (answers.main === 'Do action 2') {
      console.log('Doing action 2.');
      mainMenu();
    }
    else { // Exit
      console.log('Good bye.');
    }
  });
}

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
      console.log(`Final result is ${result}`)
      subMenu();
    }
  });
}
mainMenu();
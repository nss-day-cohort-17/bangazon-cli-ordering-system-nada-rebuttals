'use strict';

const mainMenu = () => {
  console.log('Welcome to Bangazon! Command Line Ordering System')
  console.log('1. Create a customer account')
  console.log('2. Choose active customer')
  console.log('3. Create a payment option')
  console.log('4. Add product to shopping cart')
  console.log('5. Complete an order')
  console.log('6. See product popularity')
  console.log('7. Leave Bangazon!')
}

const mainMenuPrompt = () => {
  let prompt = require('prompt')

  prompt.start();

  prompt.get(['choice'], function (err, mainMenuChoiceResult) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  Main Menu Choice: ' + mainMenuChoiceResult.choice);
    return mainMenuChoiceResult.choice
  });
}

module.exports = {mainMenu, mainMenuPrompt}

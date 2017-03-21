'use strict';

const mainMenu = () => {
  console.log('')
  console.log('')
  console.log('*************************************************')
  console.log('Welcome to Bangazon! Command Line Ordering System')
  console.log('*************************************************')
  console.log('1. Create a customer account')
  console.log('2. Choose active customer')
  console.log('3. Create a payment option')
  console.log('4. See product popularity')
  console.log('5. Leave Bangazon!')
  console.log('')
}

const mainMenuPrompt = () => {
  return new Promise((resolve, reject) => {
    let prompt = require('prompt')

    prompt.start();

    prompt.get(['choice'], function (err, mainMenuChoiceResult) {
      //
      // Log the results.
      //
      console.log('Command-line input received:');
      console.log('  Main Menu Choice: ' + mainMenuChoiceResult.choice);
      resolve(mainMenuChoiceResult.choice)
    })
  })
  // .then((res) => {
  //   router(res.choice)
  // })
}

module.exports = {mainMenu, mainMenuPrompt}

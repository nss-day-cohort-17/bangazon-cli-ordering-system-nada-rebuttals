`use strict`


//prompt code for customer choice
const customerPrompt = () => {
  module.exports = { activeCust }

  let prompt = require('prompt');

  prompt.start();

  prompt.get(['customer'], function (err, custResult) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  Active Customer: ' + custResult.customer);
    console.log('1. View Old Orders')
    console.log('2. Create New Order')
    prompt.get(['order_choice'], function (err, orderResult) {
      //
      // Log the results.
      //
      console.log('Command-line input received:');
      console.log('Order Choice: ' + orderResult.order_choice);
    });
  });
}

// const prompt = require('prompt');

//
// prompt.start();
//
// prompt.get(['customername', 'state'], function (err, result) {
//   //
//   // Log the results.
//   //
//   console.log('Command-line input received:');
//   console.log('  customer name: ' + result.customername);
//   console.log('  state: ' + result.state);
//   console.log(result)
// });


var prompt = require("prompt");
var colors = require("colors/safe");
//
// Setting these properties customizes the prompt.
//
prompt.message = colors.rainbow("Question!");
prompt.delimiter = colors.green("><");

prompt.start();

prompt.get({
  properties: {
    name: {
      description: colors.magenta("What is your name?")
    }
  }
}, function (err, result) {
  console.log(colors.cyan("You said your name is: " + result.name));
});

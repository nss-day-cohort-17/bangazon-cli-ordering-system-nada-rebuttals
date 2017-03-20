`use strict`

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')
// const {cli} = require('./cli')

const createCust = () => {
  return new Promise((resolve, reject) => {
    prompt.start();

    prompt.get(['firstName', 'lastName', 'address', 'city', 'state', 'postcode', 'phone'], (err, customerInfo) => {
      //
      // Log the results.
      //
      console.log('Command-line input received:');
      console.log('  Customer First Name: ' + customerInfo.firstName);
      resolve(customerInfo)
    });
  })
  .then((res) => {
    db.run(`INSERT INTO customers VALUES (null, "${res.firstName}", "${res.lastName}", "${res.address}", "${res.city}", "${res.state}", "${res.postcode}", "${res.phone}")`)
  })
  .then(() => {
    require('./cli')
  })
}

createCust()

module.exports = {createCust}

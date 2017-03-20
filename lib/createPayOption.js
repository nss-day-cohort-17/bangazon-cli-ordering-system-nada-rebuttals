`use strict`

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')
// const {cli} = require('./cli')

const addPay = () => {
  return new Promise((resolve, reject) => {
    prompt.start();

    prompt.get(['name', 'accountNumber'], (err, payInfo) => {
      resolve(payInfo)
    });
  })
  .then((res) => {
    db.run(`INSERT INTO payment_options VALUES (null, "${res.name}", "${res.accountNumber}")`)
  })
  .then(() => {
    require('./cli')
  })
}

addPay()

module.exports = {addPay}

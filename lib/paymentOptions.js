'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite', (res) => {
});

module.exports.paymentOptions = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT payment_options_id, payment_option_name FROM payment_options`, (err, data) => {
      data.forEach(each => {
        console.log(`${each.payment_options_id}. ${each.payment_option_name}`)
        resolve(data)
      })
    })
  });
}

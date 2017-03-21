'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite', (res) => {
});
const prompt = require('prompt');

module.exports.paymentOptions = (orderObj) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT payment_options_id, payment_option_name FROM payment_options`, (err, data) => {
      console.log('')
      console.log('')
      data.forEach(each => {
        console.log(`${each.payment_options_id}. ${each.payment_option_name}`)

        })
        prompt.start();
        prompt.get([{description: 'Card Choice', name: 'choice'}], (err, selection) => {
          resolve(selection.choice)
      })
    })
  }).then( (res) => {
    // console.log('orderObj', orderObj)
    // console.log(res)
    console.log('')
    db.run(`UPDATE orders SET payment_options_id = ${res}, paid_in_full = 1 WHERE order_id = ${orderObj.orderId}`)
    console.log('Your order is complete. Press any key to return to the main menu')

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.once('data', () => {
      const {mainMenu, mainMenuPrompt} = require('./mainMenu')
      mainMenu()
      mainMenuPrompt()
      .then((res) => {
        const {router} = require('../lib/router')
        router(res)

      })
    })


  })
}

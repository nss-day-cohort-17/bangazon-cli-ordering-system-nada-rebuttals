'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')

module.exports.completeOrder = (orderObj) => {
  if(orderObj.products.length === 0) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT SUM(p.product_price) AS Total FROM products p LEFT JOIN order_line_item ON p.products_id = order_line_item.products_id WHERE order_line_item.order_id = ${orderObj.orderId}`, (err, data) => {
        console.log(`Your order total is: ${data[0].Total}. Ready to purchase?`)
        // resolve(data)
        prompt.start();
        prompt.get([{description: '(Y/N)', name: 'choice'}], (err, selection) => {
          resolve(selection.choice)
        });
      })
    })
    .then((res) => {
      if (res === "y") {
        const {paymentOptions} = require('./paymentOptions')
        paymentOptions(orderObj)
      } else if(res === 'n') {
        const {mainMenu, mainMenuPrompt} = require('./mainMenu')
        mainMenu()
        mainMenuPrompt()
        .then((res) => {
          const {router} = require('../lib/router')
          router(res)
        })
      }
    })
  } else {

  }
}

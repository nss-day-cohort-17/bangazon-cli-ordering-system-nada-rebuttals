'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')

module.exports.completeOrder = (orderObj) => {
  // console.log(orderObj)
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
    if (orderObj.orderId === null) {
      return new Promise((resolve, reject) => {
        resolve(db.run(`INSERT INTO orders VALUES (null, '${orderObj.customerId}', null, -1)`))
      }).then ( () => {
        return new Promise( (resolve, reject) => {
          db.all(`SELECT MAX(order_id) AS OrderId FROM orders`, (err, data) => {
            // console.log('data', data)
            orderObj.orderId = data[0].OrderId
            // console.log('orderObj', orderObj)
            orderObj.products.forEach( each => {
              resolve(db.run(`INSERT INTO order_line_item VALUES (null, ${orderObj.orderId}, ${each})`))
            })
          })
        })

      }).then ( () => {
        return new Promise((resolve, reject) => {
          db.all(`SELECT ROUND(SUM(p.product_price), 2) AS Total FROM products p LEFT JOIN order_line_item ON p.products_id = order_line_item.products_id WHERE order_line_item.order_id = ${orderObj.orderId}`, (err, data) => {
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

      })
    } else {
      return new Promise ( (resolve, reject) => {
        orderObj.products.forEach( each => {
          resolve(db.run(`INSERT INTO order_line_item VALUES (null, ${orderObj.orderId}, ${each})`))
          })
        }).then ( () => {
          return new Promise((resolve, reject) => {
            db.all(`SELECT ROUND(SUM(p.product_price), 2) AS Total FROM products p LEFT JOIN order_line_item ON p.products_id = order_line_item.products_id WHERE order_line_item.order_id = ${orderObj.orderId}`, (err, data) => {
              console.log('')
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

      })
    }
  }
}

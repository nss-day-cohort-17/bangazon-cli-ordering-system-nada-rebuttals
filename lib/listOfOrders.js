'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')

const listOfOrders = (customerId) => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT order_id FROM orders WHERE customer_id = ${customerId}`, (err, data) => {
      // console.log("Data:", data[0].order_id, "Error?:", err) ;
      data.forEach((each) => {
        console.log(`Order Number: ${each.order_id}`)
      })
      console.log('Or type "new" for new order.')
      resolve(data[0].order_id);
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log('')
      prompt.start();
      prompt.get(['order'], (err, selection) => {
        resolve(selection.order)
      });
    })
    .then((res) => {
      if (res === "new") {
        let orderObj = {}
        orderObj.customerId = customerId
        orderObj.orderId = null
        console.log('orderObj', orderObj)
        const {listProducts} = require('./products')
        listProducts(orderObj)
      } else {
        let orderObj = {}
        orderObj.customerId = customerId
        orderObj.orderId = res
        console.log('orderObj', orderObj)
        listOfItems(orderObj)
      }
    })
  })
}

//take the active customer num and passes it to orders
    //to return all orders to the active customer
// listOfOrders(5)



//takes order number(s) returned by listOfOrders
//and returns all items from that order(s)
const listOfItems = (orderObj) => {

  return new Promise((resolve, reject) => {
    db.all(`SELECT p.product_name FROM products p LEFT JOIN order_line_item ON p.products_id = order_line_item.products_id WHERE order_line_item.order_id = ${orderObj.orderId}`, (err, data) => {
      data.forEach(each => {
        //shows a list of products for order that was selected
        console.log('')
        console.log('')
        console.log('Order contains:')
        console.log(each.product_name);
        console.log('')
        console.log('1. Complete this order')
        console.log('2. Return to main menu.')
      })
      resolve(data)
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log('')
      prompt.start();
      prompt.get(['choice'], (err, selection) => {
        resolve(selection.choice)
      });
    })
    .then((res) => {
      if (res === "1") {
        console.log('orderObj passed in ', orderObj)
        const {listProducts} = require('./products')
        listProducts(orderObj)
      } else {
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

// listOfOrders(1)
// listOfItems(2)

module.exports = { listOfOrders,  listOfItems }

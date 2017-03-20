'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')


const listProducts = (orderObj) => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT * FROM products`, (err, data) => {
      let allProducts = {}
      data.forEach(each => {
        console.log(`${each.products_id}. ${each.product_name} ${each.product_price}`)
      })
      // console.log(data);
      resolve(data)
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log('')
      console.log('enter "done" to finish adding items')
      prompt.start();
      prompt.get(['choice'], (err, selection) => {
        resolve(selection.choice)
      });
    })
    .then((res) => {
      if (res === "done") {
        if (orderObj.orderId === null && orderObj.products.length === 0) {
          console.log('Please add some products to your order first.')
          listProducts(orderObj)
        } else {
          const {completeOrder} = require('./completeOrder')
          completeOrder(orderObj)
        }
      } else {
        orderObj.products.push(res)
        // console.log(orderObj)
        listProducts(orderObj)
      }
    })
  })
}

// listProducts()


module.exports = { listProducts }

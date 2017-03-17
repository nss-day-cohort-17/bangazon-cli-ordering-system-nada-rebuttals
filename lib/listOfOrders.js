'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite', (res) => {
  // console.log(res)
});

const listOfOrders = (customerId) => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT order_id FROM orders WHERE customer_id = ${customerId}`, (err, data) => {
      console.log("Data:", data[0].order_id, "Error?:", err) ;
      resolve(data);
    })
  })
}

//take the active customer num and passes it to orders
    //to return all orders to the active customer
// listOfOrders(5)



//takes order number(s) returned by listOfOrders
//and returns all items from that order(s)
const listOfItems = (num) => {

  return new Promise((resolve, reject) => {
    db.all(`SELECT p.product_name FROM products p LEFT JOIN order_line_item ON p.products_id = order_line_item.products_id WHERE order_line_item.order_id = ${num}`, (err, data) => {
      data.forEach(each => {
        //shows a list of products for order that was selected
        console.log(each.product_name);
      })
      resolve(data)
    })
  })
}

module.exports = { listOfOrders,  listOfItems }

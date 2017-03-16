'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite', (res) => {
  // console.log(res)
});

const listOfOrders = (customerId) => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT order_id FROM orders WHERE customer_id = ${customerId}`, (err, data) => {
      console.log("data", data[0].order_id, err) ;
      resolve(data);
    })
  })
}

// listOfOrders()


module.exports = { listOfOrders }

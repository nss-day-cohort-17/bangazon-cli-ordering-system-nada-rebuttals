'use strict';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')

const activeCust = () => {
  return new Promise( (resolve, reject) => {
    db.all(`SELECT * FROM customers`, (err, data) => {
      // console.log("data", data, err);
      let customers = {}
      data.forEach(each => {
        customers.names = each.firstName + " " + each.lastName;
        customers.id = each.customer_id + "."
        console.log(customers.id, customers.names)

      })
      // console.log(customers)
      resolve(customers);
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log('')
      prompt.start();
      prompt.get(['customer'], (err, selection) => {
        resolve(selection.customer)
      });
    })
    .then((res) => {
      res = parseInt(res)
      const {listOfOrders} = require('./listOfOrders')
      listOfOrders(res)
    })
  })
};


// activeCust();



module.exports = { activeCust }

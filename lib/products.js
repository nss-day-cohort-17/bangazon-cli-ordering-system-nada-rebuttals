'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite', (res) => {
  // console.log(res)
});


const listProducts = () => {
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
}

// listProducts()


module.exports = { listProducts }

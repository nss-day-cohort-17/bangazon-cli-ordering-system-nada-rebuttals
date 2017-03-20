'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const Table = require('cli-table');


// instantiate a table with required widths
const productsTable = new Table({
    head: ['Product', 'Orders', 'Customers', 'Revenue'],
    colWidths: [18, 11, 11, 15]
});


const getPopProducts = () => {
    return new Promise((resolve, reject) => {
    db.all(`SELECT products.product_name AS Product,
      COUNT(order_line_item.order_line_item_id) AS Orders,
      COUNT(customers.customer_id) AS Customers,
      ROUND(SUM(products.product_price), 2) AS Revenue
      FROM products
      LEFT JOIN order_line_item ON order_line_item.products_id = products.products_id
      LEFT JOIN  orders ON orders.order_id= order_line_item.order_id
      LEFT JOIN customers ON customers.customer_id = orders.customer_id
      GROUP BY products.product_name
      ORDER BY COUNT(order_line_item.order_line_item_id) DESC
      LIMIT 3`, (err, data) => {
        //resolves querydata from callback
        resolve(data)
        // defines a new array to store object values
        let arr = [];
        //loops over each item in array
        data.forEach(each => {
          // sets each objects value to an array value
          arr = Object.keys(each).map(k => each[k])
          //pushes that array into table
          productsTable.push(arr);

        })
        //prints completed table to console
        console.log(productsTable.toString());
      })
  });
}

getPopProducts()

module.exports = { getPopProducts }

'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');

module.exports.popularProducts = () => {
    return new Promise((resolve, reject) => {
    db.all(`SELECT products.product_name AS Product,
      COUNT(order_line_item.order_line_item_id) AS Orders,
      COUNT(customers.customer_id) AS Customers,
      SUM(products.product_price) AS Revenue
      FROM products
      LEFT JOIN order_line_item ON order_line_item.products_id = products.products_id
      LEFT JOIN  orders ON orders.order_id= order_line_item.order_id
      LEFT JOIN customers ON customers.customer_id = orders.customer_id
      GROUP BY products.product_name
      ORDER BY COUNT(order_line_item.order_line_item_id) DESC
      LIMIT 3`, (err, data) => {
        resolve(data)
        console.log(data)
      })
  });
}

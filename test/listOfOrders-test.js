'use strict';

const { assert: {isArray, equal} } = require("chai");
const { listOfOrders, listOfItems } = require("../lib/listOfOrders.js");


describe('listOfOrders', () => {
  it('should return an array', () => {
    // isArray(listOfOrders());
  });
  it('should return array of orders', () => {
    return listOfOrders(5)
      .then((res) => {
        console.log("res", res[0])
        equal(3, res[0].order_id)
      });
  })


});

describe('listOfItems', () => {
  it('should return an array', () => {
    return listOfItems(3)
    .then((data) => {
      isArray(data)
    })
  })
})

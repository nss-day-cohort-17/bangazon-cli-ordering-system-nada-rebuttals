'use strict';

const { assert: {isArray, equal} } = require("chai");
const { paymentOptions } = require("../lib/paymentOptions.js");

describe('paymentOptions', () => {
  // it('should return an array', () => {
  //   isArray(paymentOptions());
  // });

  it(`should return an array`, () => {
    return paymentOptions()
    .then((data) => {
      isArray(data)
    })
  })

  it(`should return the array of payments`, () => {
    return paymentOptions()
    const paymentArray = [ { payment_options_id: 1, payment_option_name: 'VISA' }, { payment_options_id: 2, payment_option_name: 'Mastercard' }, { payment_options_id: 3, payment_option_name: 'American Express' }, { payment_options_id: 4, payment_option_name: 'Paypal' } ]
    .then((data) => {
      equal(data, paymentArray)
    })
  })
});

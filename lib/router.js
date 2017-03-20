`use strict`

const {addCust} = require('./createCust')
const {activeCust} = require('./activeCust')
const {addPay} = require('./createPayOption')
const {productPop} = require('./popularProducts')
const {leave} = require('./exitBang')

const router = (menuChoice) => {
  console.log('hello')
  switch (menuChoice) {
    case 1:
      addCust()
      break;
    case "2":
      activeCust()
      break;
    case 3:
      addPay()
      break;
    case 4:
      productPop()
      break;
    case 5:
      leave()
      break;
  }
}

module.exports = {router}

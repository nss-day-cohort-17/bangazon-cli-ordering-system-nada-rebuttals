`use strict`

const {addCust} = require('./createCust')
const {activeCust} = require('./activeCust')
const {addPay} = require('./createPayOption')
const {getPopProducts} = require('./popularProducts')
const {exitBang} = require('./exitBang')

const router = (menuChoice) => {
  switch (menuChoice) {
    case "1":
      addCust()
      break;
    case "2":
      activeCust()
      break;
    case "3":
      addPay()
      break;
    case "4":
      productPop()
      break;
    case "5":
      exitBang()
      break;
  }
}

module.exports = {router}

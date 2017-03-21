`use strict`

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bangazon.sqlite');
const prompt = require('prompt')
const {mainMenu, mainMenuPrompt} = require('./mainMenu')

const addPay = () => {
  return new Promise((resolve, reject) => {
    console.log('')
    console.log('')
    prompt.start();

    prompt.get(['name', 'accountNumber'], (err, payInfo) => {
      resolve(payInfo)
    });
  })
  .then((res) => {
    db.run(`INSERT INTO payment_options VALUES (null, "${res.name}", "${res.accountNumber}")`)
  })
  .then(() => {
    mainMenu()
    mainMenuPrompt().then((res) => {
      const {router} = require('./router')
      router(res)
    })
  })
}

// addPay()

module.exports = {addPay}

require('@babel/polyfill')
const fs = require('fs')
const path = require('path')
const renderFile = require('twig').renderFile

const appDirectory = fs.realpathSync(process.cwd())

global.render = (twigFile, data = {}) =>
  new Promise((resolve, reject) => {
    renderFile(path.resolve(appDirectory, twigFile), data, (err, html) => {
      if (err) {
        reject(err)
      } else {
        document.body.innerHTML = html
        resolve(html)
      }
    })
  })

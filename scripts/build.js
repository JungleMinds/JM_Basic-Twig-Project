/* eslint-disable no-console */
const fs = require('fs-extra')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')

console.time('Build completed in')

fs.removeSync('./build')

const walk = function(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(function(file) {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file))
    } else {
      /* Is a file */
      results.push(file)
    }
  })
  return results
}

const allFiles = walk('./src/components')
const allTwigFiles = allFiles.filter(file => file.substr(-5, 5) === '.twig')
allTwigFiles.forEach(file => {
  fs.copy(file, file.replace('./src/', './build/'))
})

const compiler = webpack(webpackConfig)
compiler.run((err, stats) => {
  const report = stats.toJson()
  if (report.warnings.length) {
    report.warnings.forEach(message => console.warn(message))
  }
  if (report.errors.length) {
    report.errors.forEach(message => console.error(message))
  } else if (err) {
    console.error(err)
  } else {
    console.timeEnd('Build completed in')
    console.log(stats.hash, 'Done!')
  }
})
/* eslint-enable no-console */

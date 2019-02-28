/* eslint-disable no-console */
const fs = require('fs-extra')
const webpack = require('webpack')
const archiver = require('archiver')
const webpackConfig = require('../config/webpack.config')

const buildFolder = './build'
const distFolder = `${buildFolder}/distribution`

console.time('Build completed in')

fs.removeSync(distFolder)
fs.mkdirSync(distFolder)

// Compile dependencies
const compiler = webpack(webpackConfig)
compiler.run((err, stats) => {
  const report = stats.toJson()
  if (report.warnings.length) {
    report.warnings.forEach(message => console.warn(message))
  }
  if (report.errors.length) {
    report.errors.forEach(message => {
      throw new Error(message)
    })
  } else if (err) {
    throw err
  } else {
    createDistributionPackage(stats.hash).then(distStats => {
      console.log(stats.hash, 'Done!')
      createReport(distStats)
    })
  }
})

const createReport = ({ hash, filename, size }) => {
  const date = new Date()
  const stats = {
    hash,
    date,
    filename,
    size
  }
  fs.writeFileSync(`${distFolder}/feed.json`, JSON.stringify(stats))

  fs.writeFileSync(
    `${distFolder}/index.html`,
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Distribution ${date}</title>
</head>
<body>
  <div class="stats">
${Object.keys(stats)
  .map(stat => {
    return `    <div class="stat stat-${stat}">
      <label style="font-weight:bold;">${stat}:</label>
      ${stats[stat]}
    </div>
`
  })
  .join('')}  </div>
  <a href="${filename}" title="download ${filename}" download>Download</a>
</body>
</html>`
  )

  console.timeEnd('Build completed in')
}

const createDistributionPackage = hash =>
  new Promise((resolve, reject) => {
    console.time('Distribution bundle created in')
    const filename = `${hash}.zip`
    const output = fs.createWriteStream(`${distFolder}/${filename}`)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('finish', function() {
      console.timeEnd('Distribution bundle created in')
      console.log(archive.pointer() + ' total bytes')

      resolve({
        hash,
        filename,
        size: archive.pointer()
      })
    })

    archive.on('warning', function(err) {
      if (err.code === 'ENOENT') {
        console.warn(err.message)
      } else {
        // throw error
        reject(err)
      }
    })

    archive.on('error', function(err) {
      reject(err)
    })

    archive.pipe(output)

    // Get all files
    const allFiles = readFolder('./src')

    // Add all twig files to archive
    allFiles
      .filter(file => file.substr(-5, 5) === '.twig')
      .forEach(file => {
        archive.append(fs.createReadStream(file), {
          name: file.replace('./src/', './templates/')
        })
      })

    // Add public folder to archive
    archive.directory(`public`, 'public')
    // Add script and style bundles to archive
    archive.append(fs.createReadStream(`${buildFolder}/script.${hash}.js`), {
      name: `script.${hash}.js`
    })
    archive.append(fs.createReadStream(`${buildFolder}/styles.${hash}.css`), {
      name: `styles.${hash}.css`
    })

    archive.finalize()
    setTimeout(() => {}, 4000)
  })

// Helpers

const readFolder = function(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(function(file) {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(readFolder(file))
    } else {
      results.push(file)
    }
  })
  return results
}
/* eslint-enable no-console */

'use strict'

const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

// Paths
const appDirectory = fs.realpathSync(process.cwd())
const dotEnvFile = path.resolve(appDirectory, '.env')
const packageFile = path.resolve(appDirectory, 'package.json')

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `${dotEnvFile}.${NODE_ENV}.local`,
  `${dotEnvFile}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${dotEnvFile}.local`,
  dotEnvFile
].filter(Boolean)

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile
      })
    )
  }
})

// Add git commit hash if possible
if (!process.env.COMMIT_HASH) {
  try {
    process.env.COMMIT_HASH = execSync('git rev-parse HEAD')
      .toString()
      .trim()
  } catch (err) {
    process.env.COMMIT_HASH = 'N.A.'
    console.error('Unable to set COMMIT_HASH', err.message)
  }
}

// Set the current version
if (process.env.npm_package_version) {
  process.env.VERSION = process.env.npm_package_version
} else {
  process.env.VERSION = require(packageFile).version || 'N.A.'
}

// Grab NODE_ENV and CLIENT_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const CLIENT = /^CLIENT_/i

const raw = Object.keys(process.env)
  .filter(key => CLIENT.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key]
      return env
    },
    {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
      // Set the current version
      VERSION: process.env.VERSION,
      // Set the current commit hash
      COMMIT: process.env.COMMIT_HASH
    }
  )

// Stringify all values so we can feed into Webpack DefinePlugin
const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {})
}

module.exports = { raw, stringified }

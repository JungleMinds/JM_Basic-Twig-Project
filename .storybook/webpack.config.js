const path = require('path')
const webpack = require('webpack')
const env = require('../config/env')

const defaultConfig = {
  module: {
    rules: []
  },
  plugins: []
}

module.exports = (baseConfig, mode) => {
  baseConfig = Object.assign(defaultConfig, baseConfig || {})

  baseConfig.module.rules.push({
    test: /\.twig$/,
    loader: 'twig-loader'
  })

  baseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../')
  })

  baseConfig.node = {
    fs: 'empty' // avoids error messages
  }

  baseConfig.plugins = baseConfig.plugins.filter(
    plugin => !(plugin instanceof webpack.DefinePlugin)
  )
  baseConfig.plugins.push(new webpack.DefinePlugin(env.stringified))

  return baseConfig
}

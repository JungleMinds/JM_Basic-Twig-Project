const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const storybookConfig = require("./webpack.config");

const config = Object.assign(storybookConfig, {
  // new config
  mode: "production",
  entry: {
    script: [path.resolve(__dirname, "../src/app.js")]
  },
  module: {
    rules: storybookConfig.module.rules.concat({
      test: /\.scss$/,
      loaders: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    })
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../build")
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ]
});

module.exports = config;

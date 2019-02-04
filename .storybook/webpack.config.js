const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: "twig-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
      }
    ]
  },
  node: {
    fs: "empty" // avoids error messages
  }
};

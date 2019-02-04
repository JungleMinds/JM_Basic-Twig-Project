const fs = require("fs-extra");
const webpack = require("webpack");
const webpackConfig = require("../.storybook/webpack.config.build");

fs.removeSync("./build");

const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + "/" + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};

const allFiles = walk("./src/components");
const allTwigFiles = allFiles.filter(file => file.substr(-5, 5) === ".twig");
allTwigFiles.forEach(file => {
  fs.copy(file, file.replace("./src/", "./build/"));
});

const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Done!");
  }
});

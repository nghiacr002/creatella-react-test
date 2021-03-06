var webpack = require('webpack');
var path = require('path');
console.log('__dirname ' + __dirname);
var BUILD_DIR = path.resolve(__dirname, './public/js');
var APP_DIR = path.resolve(__dirname, './src');
console.log('APP_DIR' + APP_DIR);
var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
  loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;

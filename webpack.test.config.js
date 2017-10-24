//this file handles webpack for /app-src and /mock/home
require('es6-promise').polyfill();

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};

const ROOT_PATH = path.resolve(__dirname);

fs.readdirSync('node_modules')
  .filter( (x) => {
    return ['.bin'].indexOf(x) === -1;
  } )
  .forEach( ( mod )=> {
    nodeModules[ mod ] = 'commonjs ' + mod;
  } )

module.exports = {
  target: 'node',
  entry: './_tests-src/test.js',
  output: {
    path: path.join(__dirname, "__tests__"),
    filename: "test.js"
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?compact=false'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer-loader?{browsers:["last 2 version", "Explorer > 8"]}!sass'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
      {
        test: /\.bfxrsound$/,
        loader: 'ignore-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: ROOT_PATH,
    alias: {
        'app': 'app-src/app/',
        'shared': 'app-src/app/shared',
        'mock-data': 'mock/json',
        'utils': 'app-src/app/utils',
        'assets': 'app-src/assets'
    }
  }
}
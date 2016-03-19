var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var type = process.env.NODE_ENV;

module.exports = {
  entry: {
    'index': './src/entry/index.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js' // Template based on keys in entry above
  },
  module: {
    loaders: [{
      test: /\.js(x?)$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
    new ExtractTextPlugin("[name].css")
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.md']
  }
};

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: {
    'index': './src/index.js',
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false
  },
  
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
}

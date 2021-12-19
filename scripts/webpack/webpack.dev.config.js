const { merge } = require('webpack-merge');

const base = require('./webpack.base.config.js');

const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    https: true,
    historyApiFallback: {
      index: '/snowman-dapp/index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new CleanTerminalPlugin(), new WebpackBar()],
});

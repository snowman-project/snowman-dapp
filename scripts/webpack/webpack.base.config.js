const path = require('path');

module.exports = {
  entry: {
    dapp: path.resolve(__dirname, '../../src/index.tsx'),
    'default-theme': path.resolve(
      __dirname,
      '../../src/themes/default/index.ts'
    ),
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'React',
    web3: 'Web3',
  },
};

const path = require('path');

console.info(path.resolve(__dirname, '../../src/index.ts'));

module.exports = {
  entry: {
    dapp: path.resolve(__dirname, '../../src/index.tsx'),
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
  },
};

const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    dapp: path.resolve(__dirname, '../../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name]-[fullhash].js',
    publicPath: '/snowman-dapp/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'esnext',
          tsconfigRaw: require('../../tsconfig.json'),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|png|jpe?g|svg)(\?\S*)?$/,
        type: 'asset/resource',
      },
    ],
  },
  externals: {
    react: 'React',
    web3: 'Web3',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.ejs'),
      filename: path.resolve(__dirname, '../../dist/index.html'),
      templateParameters: {
        isProduction: process.env.NODE_ENV === 'production',
      },
      inject: 'body',
    }),
  ],
};

console.info('NODE_ENV', process.env.NODE_ENV);

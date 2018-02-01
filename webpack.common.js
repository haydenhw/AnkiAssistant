const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/app.js',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'public/images', to: 'public/images' },
      { from: 'public/favicon.ico', to: 'public/favicon.ico' },
      { from: 'src/js/director.min.js', to: 'src/js' },
    ]),
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

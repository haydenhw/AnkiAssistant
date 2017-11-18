// var path = require('path');
// var webpack = require('webpack');
//
// module.exports = {
//   devtool: 'cheap-module-eval-source-map',
//   entry: [
//     'webpack-hot-middleware/client',
//     './src/index'
//   ],
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/static/'
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       loaders: ['react-hot', 'babel'],
//       include: path.join(__dirname, 'src')
//     }]
//   }
// };

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    "./src/index.js",
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
    publicPath: '/static',
  },
  devServer: {
    overlay: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader", "babel-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        loaders: ["file-loader"],
      },
    ],
   },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: __dirname + "/src/index.html",
    // }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
 // devtool: 'inline-source-map'
};

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./src/js/app.js",
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
  },
  devServer: {
    overlay: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /(\.scss$|\.css$)/,
        exclude: /node_modules/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg|woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loaders: ["file-loader"],
      },
    ],
   },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
    }),
    new webpack.NamedModulesPlugin(),
  ],
 devtool: 'inline-source-map'
};

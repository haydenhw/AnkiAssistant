var CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /(\.scss$|\.css$)/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg|woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "public/images", to: "public/images" },
      { from: "src/js/director.min.js", to: "src/js"}
    ]),
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
    }),
    new webpack.NamedModulesPlugin(),
  ]
};

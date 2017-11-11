module.exports = {
  context: __dirname + "/src",
  entry: "./index.js",
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loaders: ["style-loader"],
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loaders: ["css-loader"],
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        loaders: ["sass-loader"],
      },
    ],

   },
}

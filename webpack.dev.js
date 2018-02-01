const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    port: 3000,
    stats: 'minimal',
  },
});

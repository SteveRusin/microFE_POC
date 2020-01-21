const webpack = require('webpack');
const resolver = require('./custom.resolver');

module.exports = {
  resolve: {
    plugins: [new resolver()]
  }
}

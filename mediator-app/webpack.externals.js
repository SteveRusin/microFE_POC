const webpack = require('webpack');
const path = require('path');

module.exports = {
  externals: {
    System: 'System'
  },
  module: {
    rules: [
      { parser: { system: false } }
    ]
  }
}


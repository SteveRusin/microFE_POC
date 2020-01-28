const webpack = require('webpack');
const path = require('path');

module.exports = {
  externals: {
    System: 'System'
  },
  output: {
    libraryTarget: 'system',
  },
  optimization: {
    runtimeChunk: true,
  },
  module: {
    rules: [
      { parser: { system: false } }
    ]
  }
}


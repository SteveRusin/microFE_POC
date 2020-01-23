const webpack = require('webpack');
const path = require('path');

module.exports = {
  optimization: {
    runtimeChunk: false,
  },
  output: {
    path: path.join(__dirname, "./src/dll"),
    filename: "[name].dll.js",
    library: "[name]"
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, './src/dll'),
      manifest: path.resolve(__dirname, './src/dll/angular-manifest.json')
    }),
  ]
}

const webpack = require('webpack');
const path = require('path');


module.exports = {
  output: {
    filename: 'sub-[name].js',
    // crossOriginLoading: 'anonymous',
    // chunkFilename: '[name].bundle.js'
  },
  optimization: {
    runtimeChunk: false,
    moduleIds: 'named',
    chunkIds: 'named',
  },
  /*   optimization: {
      runtimeChunk: false,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `${packageName.replace('@', '')}`;
            },
          },
        },
      },
    } */
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '../mediator-app/src/dll'),
      manifest: path.resolve(__dirname, '../mediator-app/src/dll/angular-manifest.json'),
    })
  ]
}

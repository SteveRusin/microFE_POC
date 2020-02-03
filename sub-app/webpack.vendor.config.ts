import * as path from 'path';
import * as CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

module.exports = {
  devtool: 'source-map',
  entry: {
    manifest: './src/manifest.ts',
    'core.umd': './node_modules/@angular/core/esm5/index.js',
    'rxjs.umd': './node_modules/rxjs/index.js',
    'common.umd': './node_modules/@angular/common/esm5/index.js',
    'compiler.umd': './node_modules/@angular/compiler/esm5/index.js',
    'platform-browser-dynamic.umd': './node_modules/@angular/platform-browser-dynamic/esm5/index.js',
  },
  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/plugins')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
/*     new CopyPlugin([
      { from: 'node_modules/@angular/core/bundles/core.umd.js', to: '' },
      { from: 'node_modules/@angular/common/bundles/common.umd.js', to: '' },
      { from: 'node_modules/@angular/compiler/bundles/compiler.umd.js', to: '' },
      { from: 'node_modules/@angular/forms/bundles/forms.umd.js', to: '' },
      { from: 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js', to: '' },
      { from: 'node_modules/rxjs/bundles/rxjs.umd.js', to: '' },
    ]), */
  ],
  externals: {
    rxjs: 'rxjs.8',
    '@angular/core': '@angular/core.8',
    '@angular/common': '@angular/common.8',
    '@angular/forms': '@angular/forms.8',
    '@angular/compiler': '@angular/compiler.8',
    '@angular/router': '@angular/router.8',
    '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic.8',
    '@ngrx/store': 'ngrx.store',
    '@ngrx/store-devtools': 'ngrx.devTools',
    tslib: 'tslib'
    // put here other common dependencies
  }
};

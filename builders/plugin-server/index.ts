import { DevServerBuilderOptions, ExecutionTransformer, executeDevServerBuilder } from '@angular-devkit/build-angular';
import { createBuilder, BuilderContext } from '@angular-devkit/architect';
import * as fs from 'fs';
import * as webpack from 'webpack';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Schema } from '@angular-devkit/build-angular/src/browser/schema';
import * as webpackMerge from 'webpack-merge';

interface Options extends Schema {
  [key: string]: any;
}


function buildPlugin(options: Options,
  context: BuilderContext,
  transforms: {
    webpackConfiguration?: ExecutionTransformer<webpack.WebpackOptions>,
  } = {}): Observable<DevServerBuilderOptions> {

  const originalWebpackConfigurationFn = transforms.webpackConfiguration;
  transforms.webpackConfiguration = (config: webpack.WebpackOptions) => {
    const conf = patchWebpackConfig(config, options);
    const mergedConf = conf ? webpackMerge([config, conf]) : config;

    return originalWebpackConfigurationFn ? originalWebpackConfigurationFn(mergedConf) : mergedConf;
  };

  const result = executeDevServerBuilder(options as any, context, transforms);

  // @ts-ignore
  return result;
}

function patchWebpackConfig(config: webpack.WebpackOptions, options: Options): webpack.WebpackOptions {

  /*   config.optimization = {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](rxjs|@angular[\\/]core|@angular[\\/]common|@angular[\\/]forms|@angular[\\/]router|@ngrx[\\/]store|@ngrx[\\/]store-devtools|tslib)/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/](.*?)[\\/]?|$)/)[1];
  
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `${packageName.replace('@', '')}`;
            },
          },
        },
      }
    } */

  return {
    /*     externals: {
          rxjs: 'rxjs',
          '@angular/core': 'ng.core',
          '@angular/common': 'ng.common',
          '@angular/forms': 'ng.forms',
          '@angular/router': 'ng.router',
          '@ngrx/store': 'ngrx.store',
          '@ngrx/store-devtools': 'ngrx.devTools',
          tslib: 'tslib'
        }, */
    /*     output: {
          libraryTarget: 'umd',
          library: 'sub-app',
        } */
  }
}
export default createBuilder<Options>(buildPlugin);


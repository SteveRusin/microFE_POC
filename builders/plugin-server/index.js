"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_angular_1 = require("@angular-devkit/build-angular");
const architect_1 = require("@angular-devkit/architect");
const webpackMerge = require("webpack-merge");
function buildPlugin(options, context, transforms = {}) {
    const originalWebpackConfigurationFn = transforms.webpackConfiguration;
    transforms.webpackConfiguration = (config) => {
        const conf = patchWebpackConfig(config, options);
        const mergedConf = conf ? webpackMerge([config, conf]) : config;
        return originalWebpackConfigurationFn ? originalWebpackConfigurationFn(mergedConf) : mergedConf;
    };
    const result = build_angular_1.executeDevServerBuilder(options, context, transforms);
    // @ts-ignore
    return result;
}
function patchWebpackConfig(config, options) {
    debugger;
    // const dir = fs.readdirSync(options.)
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
    };
}
exports.default = architect_1.createBuilder(buildPlugin);
//# sourceMappingURL=index.js.map
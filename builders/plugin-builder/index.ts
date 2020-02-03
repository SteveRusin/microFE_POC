import { BrowserBuilderOutput, executeBrowserBuilder, ExecutionTransformer } from '@angular-devkit/build-angular';
import { createBuilder, BuilderContext } from '@angular-devkit/architect';
import * as fs from 'fs';
import * as webpack from 'webpack';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Schema } from '@angular-devkit/build-angular/src/browser/schema';
import * as webpackMerge from 'webpack-merge';

interface Options extends Schema {
  /**
   * A string of the form `path/to/file#exportName` that acts as a path to include to bundle
   */
  modulePath: string;

  /**
   * A name of compiled bundle
   */
  pluginName: string;

  /**
   * A comma-delimited list of shared lib names used by current plugin
   */
  sharedLibs: string;
  [key: string]: any;
}

let entryPointPath;

function buildPlugin(options: Options,
  context: BuilderContext,
  transforms: {
    webpackConfiguration?: ExecutionTransformer<webpack.WebpackOptions>,
  } = {}): Observable<BrowserBuilderOutput> {
  options.deleteOutputPath = false;
  validateOptions(options);

  const originalWebpackConfigurationFn = transforms.webpackConfiguration;
  transforms.webpackConfiguration = (config: webpack.WebpackOptions) => {
    const conf = patchWebpackConfig(config, options);
    const mergedConf = conf ? webpackMerge([config, conf]) : config;

    return originalWebpackConfigurationFn ? originalWebpackConfigurationFn(mergedConf) : mergedConf;
  };

  const result = executeBrowserBuilder(options, context, transforms);

  // @ts-ignore
  return result.pipe(tap(() => {
    patchEntryPoint('');
  }));
}

function patchEntryPoint(contents: string) {
  fs.writeFileSync(entryPointPath, contents);
}

function validateOptions(options: Options) {
  const { pluginName, modulePath } = options;

  if (!modulePath) {
    throw Error('Please define modulePath!');
  }

  if (!pluginName) {
    throw Error('Please provide pluginName!');
  }
}

function patchWebpackConfig(config: webpack.WebpackOptions, options: Options): webpack.WebpackOptions {
  const { pluginName, sharedLibs } = options;

  // Make sure we are producing a single bundle
  delete config.entry.polyfills;
  delete config.entry['polyfills-es5'];
  delete config.optimization.runtimeChunk;
  delete config.optimization.splitChunks;
  delete config.entry.styles;

  if (sharedLibs) {
    config.externals = [config.externals];
    const sharedLibsArr = sharedLibs.split(',');
    sharedLibsArr.forEach(sharedLibName => {
      const factoryRegexp = new RegExp(`${sharedLibName}.ngfactory$`);
      config.externals[0][sharedLibName] = sharedLibName; // define external for code
      config.externals.push((context, request, callback) => {
        if (factoryRegexp.test(request)) {
          return callback(null, sharedLibName); // define external for factory
        }
        callback();
      });
    });
  }

  // preserve path to entry point
  // so that we can clear use it within `run` method to clear that file
  entryPointPath = config.entry.main[0];

  const [modulePath, moduleName] = options.modulePath.split('#');

  const factoryPath = `${
    modulePath.includes('.') ? modulePath : `${modulePath}/${modulePath}`
    }.ngfactory`;
  const entryPointContents = `
       export * from '${modulePath}';
       export * from '${factoryPath}';
       import { ${moduleName}NgFactory } from '${factoryPath}';
       export default ${moduleName}NgFactory;
    `;
  patchEntryPoint(entryPointContents);

  return {
    output: {
      filename: `${pluginName}.js`,
      library: pluginName,
      libraryTarget: 'umd',
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
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
  }
}

export default createBuilder<Options>(buildPlugin);

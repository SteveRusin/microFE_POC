"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const build_angular_1 = require("@angular-devkit/build-angular");
const architect_1 = require("@angular-devkit/architect");
const fs = require("fs");
const operators_1 = require("rxjs/operators");
const webpackMerge = require("webpack-merge");
let entryPointPath;
function buildPlugin(options, context, transforms = {}) {
    options.deleteOutputPath = false;
    validateOptions(options);
    const originalWebpackConfigurationFn = transforms.webpackConfiguration;
    transforms.webpackConfiguration = (config) => {
        const conf = patchWebpackConfig(config, options);
        const mergedConf = conf ? webpackMerge([config, conf]) : config;
        return originalWebpackConfigurationFn ? originalWebpackConfigurationFn(mergedConf) : mergedConf;
    };
    const result = build_angular_1.executeBrowserBuilder(options, context, transforms);
    // @ts-ignore
    return result.pipe(operators_1.tap(() => {
        patchEntryPoint('');
    }));
}
function patchEntryPoint(contents) {
    fs.writeFileSync(entryPointPath, contents);
}
function validateOptions(options) {
    const { pluginName, modulePath } = options;
    if (!modulePath) {
        throw Error('Please define modulePath!');
    }
    if (!pluginName) {
        throw Error('Please provide pluginName!');
    }
}
function patchWebpackConfig(config, options) {
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
    const factoryPath = `${modulePath.includes('.') ? modulePath : `${modulePath}/${modulePath}`}.ngfactory`;
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
    };
}
exports.default = architect_1.createBuilder(buildPlugin);
//# sourceMappingURL=index.js.map
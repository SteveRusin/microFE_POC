const fs = require('fs');

class ConcatFiles {
  apply(compiler) {
    compiler.hooks.done.tap("BundleSizePlugin", (stats) => {
      const {
         path,
         filename
      } = stats.compilation.options.output;
      const subRuntime = fs.readFileSync(`${path}/sub-runtime.js`);
      const subMain = fs.readFileSync(`${path}/sub-main.js`);
     fs.writeFileSync(`${path}/sub-main.js`, Buffer.concat([subRuntime, subMain]))
    })
  }
}

module.exports = ConcatFiles;

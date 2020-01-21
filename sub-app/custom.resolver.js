var webpack = require('webpack');
var path = require('path');

function MyResolverPlugin(source, target) {
  this.source = source;
  this.target = target;


  this.apply = function(resolver) {
    console.dir(resolver)
    const target = resolver.ensureHook(this.target);
    resolver
      .getHook(this.source)
      .tapAsync("MyResolverPlugin", (request, resolveContext, callback) => {
        // Any logic you need to create a new `request` can go here
        console.dir(resolveContext)
        resolver.doResolve(target, request, null, resolveContext, callback);
      });
  }
}

module.exports = MyResolverPlugin;

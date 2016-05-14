/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      'jquery/dist/jquery.min.js',
      'hammerjs/hammer.min.js',
      'materialize-css/dist/css/*.css',
      'materialize-css/dist/js/*.js',
      'materialize-css/dist/fonts/roboto/Roboto-Regular.woff2',
      'materialize-css/dist/fonts/roboto/Roboto-Regular.woff',
      'materialize-css/dist/fonts/roboto/Roboto-Regular.tff',
      'angular2-materialize/dist/*',
      '@angular/**/*.js'
    ]
  });
};

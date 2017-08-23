// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: './',
    port: '9000',
    colors: true,
    browserNoActivityTimeout: 100000,
    logLevel : config.LOG_DEBUG,
    files: [
      // Add helper scripts here
      './node_modules/angular/angular.js',                             // angular
      './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
      './node_modules/angular-mocks/angular-mocks.js',                 // angular mocks
      // Add application scripts
      'website/JavaScript/app/*.js',
      // Test scripts
      'test/webapp/spec/**/*_spec.js'
    ],
    browserify: {
      watch: true,
      debug: true
    },
    preprocessors: {
      'test/*': ['browserify']
    },
    moduleName: 'app',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'], // ['Firefox','Chrome', 'PhantomJS']
  });
};

var angular = require('angular');
var lodash = require('lodash');
// Developer defined modules
var booking = require('./booking');

var app = angular.module('app', [
    booking
]);

module.exports = app;

var angular = require('angular');
var lodash = require('lodash');
// Developer defined modules
var booking = require('./booking');
var request = require('./request');

var app = angular.module('app', [
    booking, request
]);

module.exports = app;

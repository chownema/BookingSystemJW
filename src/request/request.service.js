var angular = require('angular');
var app = angular.module('request.module');

app.factory('RequestService', [
    '$http', function ($http) {
        var srv = this;
        srv.endpoint = 'https://fbr50l67ie.execute-api.us-east-1.amazonaws.com/jwBooking';
        // CRUD
        srv.addRecord = function () {
            return $http.post(srv.endpoint);
        };     
        srv.removeRecord = function () {

        };     
        srv.getRecord = function () {

        };     
        srv.getRecordList = function () {

        };     
        srv.getRecord = function () {

        };     

        return srv;
    }]);

module.exports = app;
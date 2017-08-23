var angular = require('angular');
var _ = require('lodash');
var app = angular.module('booking.module');

app.factory('BookingService', [
    '$http', function ($http) {
        var srv = this;

        var _bookings = [];
        // CRUD
        srv.addBooking = function (data) {
            _bookings.push(data);
        };
        srv.addBookingList = function (data) {
            _bookings = data;
        };
        srv.removeBooking = function (id) {
            _.remove(_bookings, {
                id: id
            });
        };
        srv.editBooking = function (booking) {
            angular.forEach(_bookings, function (item, key) {
                if (item.id === booking.id) {
                    _bookings[key] = booking;
                }
            });
        };
        srv.getBooking = function (id) {
            return _.find(_bookings, { 'id': id });
        };
        srv.getBookingList = function () {
            return _bookings;
        };

        return srv;
    }]);

module.exports = app;
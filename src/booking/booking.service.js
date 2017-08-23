var angular = require('angular');
var app = angular.module('booking.module');

app.factory('BookingService', function () {
    var srv = this;

    srv.setBooking = function () {
        return 1;
    };

    return srv;
});

module.exports = app;
describe('Booking Module', function () {
    var bookingService;
    beforeEach(angular.mock.module('booking.module'));

    beforeEach(inject(function (_BookingService_) {
        bookingService = _BookingService_;
    }));

    it('expect set booking', function () {
        expect(bookingService.setBooking()).toEqual(1);
    });
});
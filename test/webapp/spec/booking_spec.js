describe('Booking Module', function () {
    // var bookingService;
    // var booking1;

    beforeEach(angular.mock.module('booking.module'));

    beforeEach(inject(function (_BookingService_) {
        bookingService = _BookingService_;

        booking1 = {id:1};
        booking2 = {id:2};
        eBooking1 = {id:1, edited : true};
        bookingList = [booking1, booking2];
        bookingService.addBookingList(bookingList);
    }));

    it('expect set and get booking', function () {
        expect(bookingService.getBooking(booking1.id)).toEqual(booking1);
    });

    it('expect set and get booking list', function () {
        expect(bookingService.getBookingList()).toEqual(bookingList);
    });

    it('expect edit booking', function () {
        bookingService.editBooking(eBooking1);
        expect(bookingService.getBooking(booking1.id)).toEqual(eBooking1);
    });

    it('expect delete booking item', function () {
        bookingService.removeBooking(booking2.id);
        expect(bookingService.getBooking(booking2.id)).toEqual(undefined);
    });
});
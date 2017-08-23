describe('Booking Module', function () {

    beforeEach(angular.mock.module('booking.module'));
    beforeEach(angular.mock.module('request.module'));

    beforeEach(inject(function (_BookingService_, _RequestService_, _$httpBackend_) {
        bookingService = _BookingService_;
        requestService = _RequestService_;
        $httpBackend = _$httpBackend_;

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

    it('get booking from aws', function (done) {
        var item;
        requestService.addRecord().then(function(response) {console.log(response); item=response.data.Item;}, function(err) {console.error(err)});        
        $httpBackend.expect('POST', requestService.endpoint).respond(200, {Item : {}});
        expect($httpBackend.flush).not.toThrow();
        expect(item).toEqual('item');
        done();
    });
});
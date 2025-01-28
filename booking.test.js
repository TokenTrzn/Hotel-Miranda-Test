const Booking = require('./booking')

const room = { name: 'Room 1', bookings: [], rate: 12000, discount: 20}

const booking = new Booking('Alberto', 'alberto@gmail.com', new Date(), new Date(), 15, room)
describe('TEST DE BOOKINGS', () => {

    test('Get Fee Method', () => {
        expect(booking.fee).toBe(8160)
    })
})

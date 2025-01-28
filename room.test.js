const Room = require('./Room')

const bookings = [
    {
        name: 'Alberto',
        email: 'alberto@gmail.com',
        checkIn: new Date('2025-01-27'),
        checkOut: new Date('2025-01-30'),
        discount: 20,
        room: room
    }, {
        name: 'Paco',
        email: 'paco@gmail.com',
        checkIn: new Date('2025-02-10'),
        checkOut: new Date('2025-02-15'),
        discount: 15,
        room: room
    }, {
        name: 'Luis',
        email: 'luis@gmail.com',
        checkIn: new Date('2025-03-18'),
        checkOut: new Date('2025-03-22'),
        discount: 10,
        room: room
    }
]

const room = new Room('Room 2', bookings, 10000, 10)
describe('TEST DE ROOMS', () => {

    test('Is Occupied Method', () => {
        expect(room.isOccupied(new Date('2025-01-22'))).toBeTruthy()
    })
})


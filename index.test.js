const { Room, Booking } = require('./index')

const bookings = [
    {
        name: 'Alberto',
        email: 'alberto@gmail.com',
        checkIn: new Date('2025-01-27'),
        checkOut: new Date('2025-01-30'),
        discount: 20,
        room: new Room('Room 1', [], 10000, 10)
    }, {
        name: 'Paco',
        email: 'paco@gmail.com',
        checkIn: new Date('2025-02-10'),
        checkOut: new Date('2025-02-15'),
        discount: 15,
        room: new Room('Room 2', [], 10000, 10)
    }, {
        name: 'Luis',
        email: 'luis@gmail.com',
        checkIn: new Date('2025-03-18'),
        checkOut: new Date('2025-03-22'),
        discount: 10,
        room: new Room('Room 3', [], 10000, 10)
    }
]

const room = new Room('Room 1', bookings, 10000, 10)
const roomWithoutBookings = new Room('Room 1', [], 1000, 10)

const rooms = [room]
const roomsWithoutBookings = [roomWithoutBookings]

describe('TEST DE ROOMS', () => {

    test('IsOccupied Method', () => {
        expect(room.isOccupied(new Date('2025-01-22'))).toBeFalsy()
        expect(room.isOccupied(new Date('2025-03-20'))).toBeTruthy()
    })

    test('OccupancyPercentage Method', () => {
        expect(roomWithoutBookings.occupancyPercentage(new Date('2025-01-10'), new Date('2025-01-15'))).toBe(0)
        expect(room.occupancyPercentage(new Date('2025-02-11'), new Date('2025-02-14'))).toBe(100)
        expect(room.occupancyPercentage(new Date('2025-03-16'), new Date('2025-03-19'))).toBe(50)
    })

    test('TotalOccupancyPercentage Method', () => {
        expect(Room.totalOccupancyPercentage(roomsWithoutBookings, new Date('2025-01-27'), new Date('2025-01-31'))).toBe(0)
        expect(Room.totalOccupancyPercentage(rooms, new Date('2025-02-12'), new Date('2025-02-14'))).toBe(100)
        expect(Room.totalOccupancyPercentage(rooms, new Date('2025-03-16'), new Date('2025-03-19'))).toBe(50)
    })

    test('AvailableRooms Method', () => {
        expect(Room.availableRooms(roomsWithoutBookings, new Date('2025-01-10'), new Date('2025-01-15'))).toStrictEqual(roomsWithoutBookings)
        expect(Room.availableRooms(rooms, new Date('2025-02-20'), new Date('2025-03-10'))).toStrictEqual(rooms)
    })
})

const booking = new Booking('Alberto', 'alberto@gmail.com', new Date('2025-01-01'), new Date('2025-01-06'), 15, room)

describe('TEST DE BOOKINGS', () => {

    test('GetFee Method', () => {
        const bookingDays = (booking.checkOut - booking.checkIn) / (1000 * 60 * 60 * 24);
        const roomRate = room.rate - (room.rate * room.discount / 100);
        const discountedRate = roomRate - (roomRate * booking.discount / 100);
        const expectedFee = Math.round(discountedRate * bookingDays);
        expect(booking.fee).toBe(expectedFee);
    })
})
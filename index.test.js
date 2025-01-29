const { Room, Booking } = require('./index')

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

const room = new Room('Room 1', bookings, 10000, 10)
const roomWithoutBookings = new Room('Room 2', [], 15000, 20)

const rooms = [room, room]
const roomsWithoutBookings = [roomWithoutBookings, roomWithoutBookings]

describe('TEST DE ROOMS', () => {

    test('IsOccupied Method', () => {
        expect(room.isOccupied(new Date('2025-01-22'))).toBeFalsy()
        expect(room.isOccupied(new Date('2025-03-20'))).toBeTruthy()
    })

    test('OccupancyPercentage Method', () => {
        expect(room.occupancyPercentage(new Date('2025-01-10'), new Date('2025-01-15'))).toBe(0)
        expect(room.occupancyPercentage(new Date('2025-02-11'), new Date('2025-02-14'))).toBe(100)
        expect(room.occupancyPercentage(new Date('2025-03-16'), new Date('2025-03-19'))).toBe(50)
    })

    test('TotalOccupancyPercentage Method', () => {
        expect(Room.totalOccupancyPercentage(roomsWithoutBookings, new Date('2025-01-27'), new Date('2025-01-31'))).toBe(0)
        expect(Room.totalOccupancyPercentage(rooms, new Date('2025-02-11'), new Date('2025-02-14'))).toBe(100)
        expect(Room.totalOccupancyPercentage(rooms, new Date('2025-03-16'), new Date('2025-03-19'))).toBe(50)
    })

    test('AvailableRooms Method', () => {
        expect(Room.availableRooms(roomsWithoutBookings, new Date('2025-01-10'), new Date('2025-01-15'))).toBe(roomsWithoutBookings)
        expect(Room.availableRooms(rooms, new Date('2025-02-20'), new Date('2025-03-10'))).toBe(rooms)
        expect(Room.availableRooms(rooms, new Date('2025-01-11'), new Date('2025-01-14'))).toBe([])
    })
})

const booking = new Booking('Alberto', 'alberto@gmail.com', new Date('2025-01-01'), new Date('2025-01-06'), 15, room)

describe('TEST DE BOOKINGS', () => {

    test('GetFee Method', () => {
        const bookingDays = (booking.checkOut - booking.checkIn) / (1000 * 60 * 60 * 24)
        const expectedFee = room.rate * (100 - (room.discount / 100) * (100 - (booking.discount / 100)) * bookingDays)
        expect(booking.fee).toBe(expectedFee)
    })
})

const { Room, Booking } = require('./index')

describe('TEST DE ROOMS', () => {

    test('Room Create', () => {
        const room = new Room('Room 1', [], 10000, 10)
        expect(room.name).toBe('Room 1')
        expect(room.bookings).toStrictEqual([])
        expect(room.rate).toBe(10000)
        expect(room.discount).toBe(10)
    })

    test('IsOccupied Method', () => {
        const bookings = [
            {
                name: 'Alberto',
                email: 'alberto@gmail.com',
                checkIn: new Date('2025-01-27'),
                checkOut: new Date('2025-01-30'),
                discount: 20,
                room: new Room('Room 1', [], 10000, 10)
            }
        ]
        expect(new Room('Room 1', [], 10000, 10).isOccupied(new Date('2025-01-22'))).toBeFalsy()
        expect(new Room('Room 1', bookings, 10000, 10).isOccupied(new Date('2025-01-28'))).toBeTruthy()
    })

    test('OccupancyPercentage Method', () => {
        const bookings = [
            {
                name: 'Alberto',
                email: 'alberto@gmail.com',
                checkIn: new Date('2025-01-27'),
                checkOut: new Date('2025-01-30'),
                discount: 20,
                room: new Room('Room 1', [], 10000, 10)
            }
        ]
        expect(new Room('Room 1', [], 1000, 10).occupancyPercentage(new Date('2025-01-10'), new Date('2025-01-15'))).toBe(0)
        expect(new Room('Room 1', bookings, 10000, 10).occupancyPercentage(new Date('2025-01-27'), new Date('2025-01-29'))).toBe(100)
        expect(new Room('Room 1', bookings, 10000, 10).occupancyPercentage(new Date('2025-01-25'), new Date('2025-01-28'))).toBe(50)
    })

    test('TotalOccupancyPercentage Method', () => {
        const bookings = [
            {
                name: 'Alberto',
                email: 'alberto@gmail.com',
                checkIn: new Date('2025-01-27'),
                checkOut: new Date('2025-01-30'),
                discount: 20,
                room: new Room('Room 1', [], 10000, 10)
            }
        ]
        const roomsWithoutBookings = [new Room('Room 1', [], 1000, 10), new Room('Room 2', [], 1000, 10)]
        const rooms = [new Room('Room 1', bookings, 10000, 10)]
        expect(Room.totalOccupancyPercentage(roomsWithoutBookings, new Date('2025-01-27'), new Date('2025-01-30'))).toBe(0)
        expect(Room.totalOccupancyPercentage(rooms, new Date('2025-01-27'), new Date('2025-01-29'))).toBe(100)
        expect(Room.totalOccupancyPercentage(rooms, new Date('2025-01-28'), new Date('2025-01-31'))).toBe(75)
    })

    test('AvailableRooms Method', () => {
        const bookings = [
            {
                name: 'Alberto',
                email: 'alberto@gmail.com',
                checkIn: new Date('2025-01-27'),
                checkOut: new Date('2025-01-30'),
                discount: 20,
                room: new Room('Room 1', [], 10000, 10)
            }
        ]
        const roomsWithoutBookings = [new Room('Room 1', [], 1000, 10), new Room('Room 2', [], 1000, 10)]
        const rooms = [new Room('Room 1', bookings, 10000, 10)]
        expect(Room.availableRooms(roomsWithoutBookings, new Date('2025-01-10'), new Date('2025-01-15'))).toStrictEqual(roomsWithoutBookings)
        expect(Room.availableRooms(rooms, new Date('2025-02-20'), new Date('2025-03-10'))).toStrictEqual(rooms)
    })
})


describe('TEST DE BOOKINGS', () => {

    test('Booking Create', () => {
        const room = new Room('Room 1', [], 10000, 10)
        const booking = new Booking('Alberto', 'alberto@gmail.com', new Date('2025-01-01'), new Date('2025-01-06'), 15, room)
        expect(booking.name).toBe('Alberto')
        expect(booking.email).toBe('alberto@gmail.com')
        expect(booking.checkIn).toEqual(new Date('2025-01-01'))
        expect(booking.checkOut).toEqual(new Date('2025-01-06'))
        expect(booking.discount).toBe(15)
        expect(booking.room).toBe(room)
    })

    test('GetFee Method', () => {
        const room = new Room('Room 1', [], 1000, 10)
        const booking = new Booking('Alberto', 'alberto@gmail.com', new Date('2025-01-01'), new Date('2025-01-06'), 15, room)

        const bookingDays = (booking.checkOut - booking.checkIn) / (1000 * 60 * 60 * 24)
        const roomRate = room.rate - (room.rate * room.discount / 100)
        const discountedRate = roomRate - (roomRate * booking.discount / 100)
        const expectedFee = Math.round(discountedRate * bookingDays)
        expect(booking.fee()).toBe(expectedFee)
    })
})
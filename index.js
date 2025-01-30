class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }

    isOccupied(date) {
        return this.bookings.some(booking =>
            date >= booking.checkIn && date < booking.checkOut
        )
    }

    occupancyPercentage(startDate, endDate) {
        const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
        const occupiedDays = this.bookings.reduce((acc, booking) => {
            const checkIn = new Date(Math.max(startDate, booking.checkIn))
            const checkOut = new Date(Math.min(endDate, booking.checkOut))
            if (checkIn <= checkOut) {
                const daysOccupied = (checkOut - checkIn) / (1000 * 60 * 60 * 24) + 1
                return acc + daysOccupied
            }
            return acc
        }, 0)
        return (occupiedDays / totalDays) * 100
    }

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1
        let totalOccupiedDays = 0

        rooms.forEach(room => {
            room.bookings.forEach(booking => {
                const checkIn = new Date(Math.max(startDate, booking.checkIn))
                const checkOut = new Date(Math.min(endDate, booking.checkOut))
                if (checkIn < checkOut) {
                    const daysOccupied = (checkOut - checkIn) / (1000 * 60 * 60 * 24) + 1
                    totalOccupiedDays += daysOccupied
                }
            })
        })

        return (totalOccupiedDays / (totalDays * rooms.length)) * 100
    }

    static availableRooms(rooms, startDate, endDate) {
        return rooms.filter(room =>
            !room.bookings.some(booking =>
                (booking.checkIn < endDate && booking.checkOut > startDate)
            )
        )
    }

}

class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }

    fee() {
        const totalNights = (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24)
        const roomRate = this.room.rate - (this.room.rate * this.room.discount / 100)
        const discountedRate = roomRate - (roomRate * this.discount / 100)
        return Math.round(discountedRate * totalNights)
    }
}

module.exports = { Room, Booking }
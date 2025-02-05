class Room {
    name: String;
    bookings: Booking[];
    rate: number;
    discount: number;

    constructor(name: string, bookings: Booking[], rate: number, discount: number) {
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }

    isOccupied(date: Date): boolean {
        return this.bookings.some(booking =>
            date >= booking.checkIn && date < booking.checkOut
        )
    }

    occupancyPercentage(startDate: Date, endDate: Date): number {
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
        const occupiedDays = this.bookings.reduce((acc, booking) => {
            const checkIn = new Date(Math.max(startDate.getTime(), booking.checkIn.getTime()))
            const checkOut = new Date(Math.min(endDate.getTime(), booking.checkOut.getTime()))
            if (checkIn <= checkOut) {
                const daysOccupied = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24) + 1
                return acc + daysOccupied
            }
            return acc
        }, 0)
        return (occupiedDays / totalDays) * 100
    }

    static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date): number {
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
        let totalOccupiedDays = 0

        rooms.forEach(room => {
            room.bookings.forEach(booking => {
                const checkIn = new Date(Math.max(startDate.getTime(), booking.checkIn.getTime()))
                const checkOut = new Date(Math.min(endDate.getTime(), booking.checkOut.getTime()))
                if (checkIn < checkOut) {
                    const daysOccupied = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24) + 1
                    totalOccupiedDays += daysOccupied
                }
            })
        })

        return (totalOccupiedDays / (totalDays * rooms.length)) * 100
    }

    static availableRooms(rooms: Room[], startDate: Date, endDate: Date): Room[] {
        return rooms.filter(room =>
            !room.bookings.some(booking =>
                (booking.checkIn < endDate && booking.checkOut > startDate)
            )
        )
    }

}

class Booking {
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;

    constructor(name: string, email: string, checkIn: Date, checkOut: Date, discount: number, room: Room) {
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }

    fee() {
        const totalNights = (this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 60 * 60 * 24)
        const roomRate = this.room.rate - (this.room.rate * this.room.discount / 100)
        const discountedRate = roomRate - (roomRate * this.discount / 100)
        return Math.round(discountedRate * totalNights)
    }
}

module.exports = { Room, Booking }
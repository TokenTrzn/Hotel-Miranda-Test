class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }

    get fee() {
        let roomDiscount = this.Room.Rate * (1 - this.Room.Discount / 100)
        let finalPrice = roomDiscount * (1 - this.discount / 100)
        return  Math.floor(finalPrice)          
    }
}

module.exports = Booking
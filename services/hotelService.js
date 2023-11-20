const db = require("../config/db");

const getHotelById = async (hotel_id) => {
    const hotel = await db.collection("hotels").doc(hotel_id).get();
    return hotel.data();
}

const getHotelByIdInRange = async (hotel_id, start_date, end_date) => {
    const reservations = db.collection("reservations").where("hotel_id", "==", hotel_id)
    const q = await reservations.get()
    const q1 = await reservations.where("start_date", ">=", end_date).get()
    const q2 = await reservations.where("end_date", "<=", start_date).get()
    const set = new Set()
    q1.forEach(rev => {
        set.add(rev.id)
    })
    q2.forEach(rev => {
        set.add(rev.id)
    })
    const result = await getHotelById(hotel_id)
    q.forEach(rev => {
        if (!set.has(rev.id)) {
            for (let type in rev.data().rooms) {
                result.rooms[type].quantity -= rev.data().rooms[type]
                // console.log(result.rooms[type].quantity)
            }
        }
    })
    console.log(result.rooms)
    return result
}

module.exports = {
    getHotelById,
    getHotelByIdInRange
}
const db = require("../config/db");
const cityService = require("./cityService");

const getHotels = async () => {
    const snapshot = await db.collection("hotels").get();
    let result = {};
    snapshot.forEach(doc => {
        result[doc.id] = doc.data();
    });
    return result;
}

const getHotelById = async (hotel_id) => {
    const hotel = await db.collection("hotels").doc(hotel_id).get();
    const result = hotel.data();
    if (!result)
        return null;
    result.min_price = 0;
    for (let type in result.rooms) {
        if (result.min_price > result.rooms[type].price || result.min_price === 0)
            result.min_price = result.rooms[type].price
    }
    result.city_name = (await cityService.getCities())[result.city_id].name
    result.country = (await cityService.getCities())[result.city_id].country
    // console.log(result)
    return result;
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
        if (!set.has(rev.id) && !rev.data().is_cancelled) {
            for (let type in rev.data().rooms) {
                if (!result.rooms[type])
                    continue
                result.rooms[type].quantity -= rev.data().rooms[type]
                // console.log(result.rooms[type].quantity)
            }
        }
    })
    // console.log(result.rooms)
    return result
}

module.exports = {
    getHotels,
    getHotelById,
    getHotelByIdInRange
}
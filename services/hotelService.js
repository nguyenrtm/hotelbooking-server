const db = require("../config/db");

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
    const city = await db.collection("cities").doc(result.city_id).get()
    result.city_name = city.data().name
    result.country = city.data().country
    result.hotel_id = hotel_id
    // console.log(result)
    return result;
}

const getHotelByIdInRange = async (hotel_id, start_date, end_date) => {
    const reservationsSnapshot = await db
        .collection("reservations")
        .where("hotel_id", "==", hotel_id)
        .get();
    const result = await getHotelById(hotel_id);
    
    reservationsSnapshot.forEach((rev) => {
        const reservation = rev.data();
        if (
            !reservation.is_cancelled &&
            reservation.start_date.toDate() <= end_date &&
            reservation.end_date.toDate() >= start_date
        ) {
            for (let type in reservation.rooms) {
                if (result.rooms[type]) {
                    result.rooms[type].quantity -= reservation.rooms[type];
                }
            }
        }
    });
    
    return result;
};

module.exports = {
    getHotels,
    getHotelById,
    getHotelByIdInRange
}
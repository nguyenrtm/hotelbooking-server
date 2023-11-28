const hotelService = require("./hotelService");
const cityService = require("./cityService");

const create_history_response = async (snapshot, hotels, cities, getRated = false) => {
    // const hotels = await hotelService.getHotels();
    // const cities = await cityService.getCities();
    let res = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        data.start_date = data.start_date.toDate().toISOString().split('T')[0];
        data.end_date = data.end_date.toDate().toISOString().split('T')[0];
        data.create_date = data.create_date.toDate().toISOString().split('T')[0];
        data.id = doc.id;
        data.hotel_name = hotels[data.hotel_id].name;
        data.city_name = cities[hotels[data.hotel_id].city_id];
        data.hotel_imageURL = hotels[data.hotel_id].imageURL[0];
        if (!getRated || data.feedback != null)
            res.push(data);
    });
    return res;
}

module.exports = {
    create_history_response
}
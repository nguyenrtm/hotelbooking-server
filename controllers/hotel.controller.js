const db = require('../config/db')

const getAll = async (req, res) => {
    res.send("Get All!")
}

// Co-pilot wrote this :))), might need to change a bit (filter by date, etc.)
const filter = async (req, res) => {
    try {
        const city = req.query.city;
        const price = req.query.price;
        const rating = req.query.rating;
        const amenities = req.query.amenities;
        const document = db.collection("hotels");
        const response = [];
        if (city) {
            const snapshot = await document.where("location.city", "==", city).get();
            snapshot.forEach(doc => {
                const data = doc.data();
                response.push(data);
            });
        }
        if (price) {
            const snapshot = await document.where("price", "<=", parseInt(price)).get();
            snapshot.forEach(doc => {
                const data = doc.data();
                response.push(data);
            });
        }
        if (rating) {
            const snapshot = await document.where("rating", ">=", parseInt(rating)).get();
            snapshot.forEach(doc => {
                const data = doc.data();
                response.push(data);
            });
        }
        if (amenities) {
            const snapshot = await document.where("amenities", "array-contains", amenities).get();
            snapshot.forEach(doc => {
                const data = doc.data();
                response.push(data);
            });
        }
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

const getHotelById = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("hotels").doc(id);
        const hotel = await document.get();
        const response = hotel.data();
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {getAll, getHotelById, filter}
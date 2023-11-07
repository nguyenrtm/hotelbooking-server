const db = require('../config/db')

const getAll = async (req, res) => {
    res.send("Get All!")
}

const createHotel =  async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.id;
        const hotelJson = {
            name: req.body.name,
            address: req.body.address,
            location: {
                address: req.body.address,
                city: req.body.city,
                postalCode: req.body.postalCode,
            },
            amenities: {
                wifiInLobby: req.body.wifiInLobby,
                wifiInRoom: req.body.wifiInRoom,
                spa: req.body.spa,
                telephone: req.body.telephone,
                pool: req.body.pool,
                pet: req.body.pet
            },
            contact: req.body.contact,
        };

        const response = db.collection("hotels").doc(id).set(hotelJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const createRating = async (req, res) => {
    try {
        console.log(req.body);
        const hotelId = req.body.hotelId;
        const ratingId = req.body.ratingId;
        const ratingJson = {
            rating: req.body.rating,
            valueForMoney: req.body.valueForMoney,
            cleanliness: req.body.cleanliness,
            building: req.body.building,
            comfort: req.body.comfort
        };

        const response = db.collection("hotels").doc(hotelId)
                         .collection("ratings").doc(ratingId)
                         .set(ratingJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const createFeedback = async (req, res) => {
    try {
        console.log(req.body);
        const hotelId = req.body.hotelId;
        const feedbackId = req.body.feedbackId;
        const feedbackJson = {
            name: req.body.name,
            feedback: req.body.feedback,
            month: req.body.month,
            year: req.body.year
        };

        const response = db.collection("hotels").doc(hotelId)
                            .collection("feedbacks").doc(feedbackId)
                            .set(feedbackJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

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

const getFeedbackByHotelId = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("hotels").doc(id).collection("feedbacks");
        const snapshot = await document.get();
        let responseArr = [];
        snapshot.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
};

const getRatingByHotelId = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("hotels").doc(id).collection("ratings");
        const snapshot = await document.get();
        let responseArr = [];
        snapshot.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
};

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

module.exports = {
    getAll,
    createHotel,
    createRating,
    createFeedback,
    getHotelById,
    getFeedbackByHotelId,
    getRatingByHotelId,
    filter
}
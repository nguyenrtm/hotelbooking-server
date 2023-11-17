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

const search = async (req, res) => {
    try {
        console.log(req.body);
        const start_date = new Date(req.body.start_date);
        const end_date = new Date(req.body.end_date);
        const city = req.body.city;
        const document = db.collection("hotels").where("city_id", "==", city);
        const snapshot = await document.get();
        let responseArr = [];
        let hotels = [];
        snapshot.forEach(doc => {
            hotels.push(doc)
        });
        for (let i in hotels) {
            console.log(hotels[i].id)
            const reservations = db.collection("reservations").where("hotel_id", "==", hotels[i].id)
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
            const dummy = hotels[i].data()
            q.forEach(rev => {
                if (!set.has(rev.id)) {
                    for (let type in rev.data().rooms) {
                        dummy.rooms[type].quantity -= rev.data().rooms[type]
                        console.log(dummy.rooms[type].quantity)
                    }
                }
            })
            dummy.id = hotels[i].id
            let room_quantity = 0
            let ppl_quantity = 0
            for (type in dummy.rooms) {
                room_quantity += dummy.rooms[type].quantity
                ppl_quantity += dummy.rooms[type].quantity * dummy.rooms[type].capacity
            }
            console.log(room_quantity)
            console.log(ppl_quantity)
            if (room_quantity >= req.body.room_quantity && ppl_quantity >= req.body.ppl_quantity) {
                responseArr.push(dummy)
            }
        }
        console.log(responseArr)
        res.send(responseArr);
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
    search
}
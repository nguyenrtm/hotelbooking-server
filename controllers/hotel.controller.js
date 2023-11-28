const db = require('../config/db')
const hotelService = require('../services/hotelService')
const cityService = require('../services/cityService')
const reservationService = require('../services/reservationService')

const getAll = async (req, res) => {
    try {
        const snapshot = await db.collection("hotels").get();
        let responseArr = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            responseArr.push(data);
        });
        res.send(responseArr);
    } catch (err) {
        res.send(err);
    }
}

const getAllForSearch = async (req, res) => {
    try {
        const snapshot = await db.collection("hotels").get();
        const cities = await cityService.getCities()
        let responseArr = [];
        snapshot.forEach(doc => {
            const data = {
                name: doc.data().name,
                id: doc.id,
                city_id: doc.data().city_id,
                city_name: cities[doc.data().city_id].name,
                country: cities[doc.data().city_id].country
            };
            responseArr.push(data);
        });
        res.send(responseArr);
    } catch (err) {
        res.send(err);
    }
}

const getSuggested = async (req, res) => {
    try {
        const fav = {}
        const fav_snap = await db.collection("favourites")
            .where("user_id", "==", req.query.user_id)
            .get()
        fav_snap.forEach(doc => {
            fav[doc.data().hotel_id] = true
        })
        
        const snapshot = await db.collection("hotels").get();
        let responseArr = [];
        snapshot.forEach(doc => {
            hotelService
                .getHotelById(doc.id)
                .then(data => {
                    data.id = doc.id;
                    data.is_favorite = !!fav[doc.id];
                    responseArr.push(data);
                    if (responseArr.length === 3)
                        res.send(responseArr);
                });
        });
    } catch (err) {
        res.send(err);
    }

}

const createHotel =  async (req, res) => {
    try {
        const response = db.collection("hotels").add(req.body);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const getHotelById = async (req, res) => {
    try {
        if (req.query.start_date && req.query.end_date) {
            const response = await hotelService.getHotelByIdInRange(req.params.id, new Date(req.query.start_date), new Date(req.query.end_date))
            res.send(response);
        }
        else {
            const response = await hotelService.getHotelById(req.params.id)
            res.send(response);
        }
    } catch (error) {
        res.send(error)
    }
}

const search = async (req, res) => {
    try {
        const fav = {}
        const fav_snap = await db.collection("favourites")
            .where("user_id", "==", req.query.user_id)
            .get()
        fav_snap.forEach(doc => {
            fav[doc.data().hotel_id] = true
        })
        const start_date = new Date(req.query.start_date);
        const end_date = new Date(req.query.end_date);
        const city = req.query.city;
        
        const document = db.collection("hotels").where("city_id", "==", city);
        const snapshot = await document.get();
        
        let responseArr = [];
        let hotels = [];
        snapshot.forEach(doc => {
            hotels.push(doc)
        });
        for (let i in hotels) {
            const dummy = await hotelService.getHotelByIdInRange(hotels[i].id, start_date, end_date)
            // console.log(dummy)
            dummy.id = hotels[i].id
            dummy.is_favorite = !!fav[hotels[i].id];
            let room_quantity = 0
            let ppl_quantity = 0
            for (let type in dummy.rooms) {
                room_quantity += dummy.rooms[type].quantity
                ppl_quantity += dummy.rooms[type].quantity * dummy.rooms[type].capacity
            }
            // console.log(room_quantity)
            // console.log(ppl_quantity)
            if (room_quantity >= parseInt(req.query.room_quantity)
                && ppl_quantity >= parseInt(req.query.ppl_quantity)
                || hotels[i].id === req.query.hotel_id) {
                responseArr.push(dummy)
            }
        }
        // console.log(responseArr)
        res.send(responseArr);
    }
    catch (error) {
        res.send(error);
    }
}

const getFeedbacks = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("reservations")
            .where("hotel_id", "==", id.toString())
            .where("feedback", "!=", null)
            .get();
        let responseArr = await reservationService.create_history_response(snapshot);
        
        res.send(responseArr);
    }
    catch (err) {
        res.send(err)
    }
}

const getFavourites = async (req, res) => {
    try {
        // console.log(req.query.user_id)
        const snapshot = await db.collection("favourites").where("user_id", "==", req.query.user_id).get();
        const promises = [];
        
        // console.log(snapshot)
        
        snapshot.forEach(doc => {
            const promise = hotelService.getHotelById(doc.data().hotel_id)
                .then(data => {
                    data.id = doc.id;
                    data.hotel_id = doc.data().hotel_id;
                    return data;
                });
            
            promises.push(promise);
        });

        Promise.all(promises)
            .then(responseArr => {
                // Send the response after all promises are resolved
                res.send(responseArr);
            })
            .catch(err => {
                // Handle any errors that occurred during promise execution
                console.log(err)
                res.status(500).send('An error occurred');
            });
        
    }
    catch (err) {
        res.send(err)
    }

}

const addFavourite = async (req, res) => {
    const document = db.collection("favourites").where("user_id", "==", req.query.user_id).where("hotel_id", "==", req.query.hotel_id);
    const snapshot = await document.get();
    if (snapshot.empty) {
        try {
            const response = db.collection("favourites").add(req.query);
            res.send(response);
        } catch (err) {
            res.send(err)
        }
    }
    else {
        res.send("already exist")
    }
}

const deleteFavourite = async (req, res) => {
    try {
        const document = db.collection("favourites").where("user_id", "==", req.query.user_id).where("hotel_id", "==", req.query.hotel_id);
        document.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
        res.send("success")
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    getAll,
    getAllForSearch,
    getSuggested,
    createHotel,
    getHotelById,
    search,
    getFeedbacks,
    getFavourites,
    addFavourite,
    deleteFavourite
}
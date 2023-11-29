const db = require('../config/db')
const reservationService = require('../services/reservationService')
const hotelService = require('../services/hotelService')
const cityService = require('../services/cityService')

const create_reservation = async (req, res) => {
    try {
        // console.log(req.body)
        const body = req.body;
        const reservationJson = {
            user_id: body.user_id.toString(),
            hotel_id: body.hotel_id.toString(),
            is_cancelled: false,
            rooms: body.rooms,
            create_date: new Date(),
            start_date: new Date(body.start_date),
            end_date: new Date(body.end_date),
            feedback: null,
            total_cost: body.total_cost
        };
        const response = db.collection("reservations").add(reservationJson);
        // console.log(response)
        res.send(response);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const get_active = async (req, res) => {
    try {
        const hotels = await hotelService.getHotels();
        const cities = await cityService.getCities();
        const id = req.params.id;
        const snapshot = await db.collection("reservations")
            .where("user_id", "==", id.toString())
            .where("start_date", ">=", new Date())
            .where("is_cancelled", "==", false)
            .get();
        const responseArr = await reservationService.create_history_response(snapshot, hotels, cities)
        res.send(responseArr);
    } catch (err) {
        res.send(err)
    }
}

const get_rated = async (req, res) => {
    try {
        const hotels = await hotelService.getHotels();
        const cities = await cityService.getCities();
        const id = req.params.id;
        const snapshot = await db.collection("reservations")
            .where("user_id", "==", id.toString())
            .where("start_date", "<", new Date())
            .get();
        const responseArr = await reservationService.create_history_response(snapshot, hotels, cities, true)
        res.send(responseArr)
    } catch (err) {
        res.send(err)
    }
}

const get_not_rated = async (req, res) => {
    try {
        const hotels = await hotelService.getHotels();
        const cities = await cityService.getCities();
        const id = req.params.id
        const snapshot = await db.collection("reservations")
            .where("user_id", "==", id.toString())
            .where("start_date", "<", new Date())
            .where("feedback", "==", null)
            .get();
        const responseArr = await reservationService.create_history_response(snapshot, hotels, cities)
        res.send(responseArr)
    } catch (err) {
        res.send(err)
    }
}

const get_cancelled = async (req, res) => {
    try {
        const hotels = await hotelService.getHotels();
        const cities = await cityService.getCities();
        const id = req.params.id;
        const snapshot = await db.collection("reservations")
            .where("user_id", "==", id.toString())
            .where("is_cancelled", "==", true)
            .get();
        const responseArr = await reservationService.create_history_response(snapshot, hotels, cities)
        res.send(responseArr);
    } catch (error) {
        res.send(error)
    }
}

const cancel_reservation = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("reservations").doc(id);
        const response = await document.update({is_cancelled: true});
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

const create_feedback = async (req, res) => {
    try {
        const body = req.body;
        const reservation = await db.collection("reservations").doc(body.reservation_id).get();
        // console.log(reservation.data().hotel_id)
        const hotel = await db.collection("hotels").doc(reservation.data().hotel_id).get();
        const ratings = hotel.data().ratings;
        // todos: recalculate hotel's rating
        for (let i in body.ratings) {
            body.ratings[i] = parseFloat(body.ratings[i]);
            // console.log(body.ratings[i])
            ratings[i] = (ratings[i] * ratings.count + body.ratings[i]) / (ratings.count + 1);
        }
        ratings.count += 1;
        console.log(ratings)
        const response = await db.collection("hotels").doc(reservation.data().hotel_id).update({ratings: ratings})
        
        await db
            .collection("reservations")
            .doc(body.reservation_id)
            .update({feedback: {
                    comment: body.comment,
                    ratings: body.ratings
                }
            })
        
        res.send(response)
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    create_reservation,
    get_active,
    get_rated,
    get_not_rated,
    get_cancelled,
    cancel_reservation,
    create_feedback,
}
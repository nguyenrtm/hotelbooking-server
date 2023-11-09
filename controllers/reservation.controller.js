const db = require('../config/db')

const create_reservation = async (req, res) => {
    // need user_id, hotel_id, rooms and theirs quantity, and check_in, check_out
    try {
        console.log(req.body)
        const body = req.body;
        const reservationJson = {
            user_id: body.user_id.toString(),
            hotel_id: body.hotel_id.toString(),
            is_cancelled: false,
            rooms: body.rooms,
            create_date: new Date(),
            start_date: new Date(body.start_date),
            end_date: new Date(body.end_date),
        };
        const response = db.collection("reservations").add(reservationJson);
        console.log(response)
        res.send(response);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const get_history = async (req, res) => {
    // need user_id
    try {
        const id = req.params.id;
        const snapshot = await db.collection("reservations").where("user_id", "==", id.toString()).get();
        let responseArr = [];
        snapshot.forEach(doc => {
            responseArr.push(doc.data());
        });
        console.log(responseArr)
        res.send(responseArr);
    } catch (error) {
        res.send(error)
    }
}

const cancel_reservation = async (req, res) => {
    // need reservation_id
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
    // need reservation_id, user_id, hotel_id, feedback
    try {
        console.log(req.body);
        const body = req.body;
        const feedbackJson = {
            stars: body.stars,
            feedback: body.feedback,
        };
        
        // todos: recalculate hotel's rating
        
        const response = db.collection("reservations").doc(body.reservation_id).set(feedbackJson, {merge: true})
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

const get_feedback = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("reservations").where("hotel_id", "==", id);
        const snapshot = await document.get();
        let responseArr = [];
        snapshot.forEach(doc => {
            if (doc.data().feedback)
                responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    create_reservation,
    get_history,
    cancel_reservation,
    create_feedback,
    get_feedback
}
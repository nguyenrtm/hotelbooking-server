const db = require('../config/db')

const create_reservation = async (req, res) => {
    // need user_id, hotel_id, rooms and theirs quantity, and check_in, check_out
    try {
        console.log(req.body)
        const body = req.body;
        const reservationJson = {
            user_id: body.user_id,
            hotel_id: body.hotel_id,
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
        const snapshot = await db.collection("reservations").where("user_id", "==", parseInt(id)).get();
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


module.exports = {create_reservation, get_history}
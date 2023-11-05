const db = require('../config/db')
const getAll = async (req, res) => {
    res.send("Get All!")
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

module.exports = {getAll, getHotelById}
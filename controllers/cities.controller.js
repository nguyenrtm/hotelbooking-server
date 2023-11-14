const db = require('../config/db')

const getCity = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("cities").doc(id).get();
        res.send(snapshot.data());
    } catch (error) {
        res.send(error);
    }
}

const createCity = async (req, res) => {
    try {
        console.log(req.body);
        const cityJson = {
            name: req.body.name,
            restaurant: req.body.restaurant,
            entertainment: req.body.entertainment,
            transport: req.body.transport
        };

        const response =  db.collection("cities").add(cityJson);
        res.send(response);

    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    getCity,
    createCity
};
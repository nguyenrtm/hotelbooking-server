const db = require('../config/db')

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("users").doc(id).get();
        res.send(snapshot.data());
    } catch (error) {
        res.send(error);
    }
}

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const userJson = {
            name: req.body.name
        };

        const response =  db.collection("users").add(userJson);
        res.send(response);

    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    getUser,
    createUser
};
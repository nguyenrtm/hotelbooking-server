const db = require('../config/db')

const get_all = async (req, res) => {
    try {
        const response = await db.collection('users').get();
        let users = [];
        response.forEach(doc => {
            let user = doc.data();
            user.id = doc.id;
            users.push(user);
        });
        res.send(users);
    } catch (error) {
        res.send(error);
    }
}

const get_user = async (req, res) => {
    try {
        const uid = req.params.id;
        const response = await db.collection('users').doc(uid).get();
        res.send(response)
    } catch (error) {
        res.send(error);
    }
};

const create_user = async (req, res) => {
    try {
        const userJson = {
            uid: req.params.id
        };
        const response =  db.collection("users").doc(req.params.id).set(userJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    get_all,
    get_user,
    create_user
};
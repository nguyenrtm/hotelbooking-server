const db = require('../config/db');

const get_all = async (req, res) => {
    try {
        const snapshot = await db.collection("cities").get();
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
};

const get_city = async (req, res) => {
    try {
        const id = req.params.id;
        let responseArr = [];
        const restaurants = await db.collection("cities").doc(id).collection("restaurants").get();
        const todos = await db.collection("cities").doc(id).collection("todos").get();
        const transportations = await db.collection("cities").doc(id).collection("transportations").get();
        const alerts = await db.collection("cities").doc(id).collection("alerts").get();
        responseArr.push(restaurants.docs.map(doc => doc.data()));
        responseArr.push(todos.docs.map(doc => doc.data()));
        responseArr.push(transportations.docs.map(doc => doc.data()));
        responseArr.push(alerts.docs.map(doc => doc.data()));
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
};

const get_restaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("cities").doc(id)
            .collection("restaurants").get();
        let responseArr = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            responseArr.push(data);
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
}

const get_todo = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("cities").doc(id)
            .collection("todos").get();
        let responseArr = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            responseArr.push(data);
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
}

const get_transportation = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("cities").doc(id)
            .collection("transportations").get();
        let responseArr = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            responseArr.push(data);
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
}

const get_alert = async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await db.collection("cities").doc(id)
            .collection("alerts").get();
        let responseArr = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;
            responseArr.push(data);
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
}

const add_restaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("cities").doc(id);
        const restaurantJson = {
            name: req.body.name,
            image: req.body.image,
            address: req.body.address,
            rating: req.body.rating
        };
        const response = document.collection("restaurants").add(restaurantJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const add_transportation = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("cities").doc(id);
        const todoJson = {
            content: req.body.content,
            image: req.body.image,
            address: req.body.address,
            rating: req.body.rating
        };
        const response = document.collection("transportations").add(todoJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
}

const add_todo = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("cities").doc(id);
        const todoJson = {
            content: req.body.content,
            image: req.body.image,
            address: req.body.address,
            rating: req.body.rating
        };
        const response = document.collection("todos").add(todoJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const add_alert = async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("cities").doc(id);
        const alertJson = {
            content: req.body.content,
        };
        const response = document.collection("alerts").add(alertJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

const create_city = async (req, res) => {
    try {
        console.log(req.body);
        const cityJson = {
            country: req.body.country,
            name: req.body.name,
        };
        const response =  db.collection("cities").add(cityJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    get_all,
    get_city,
    get_restaurant,
    get_todo,
    get_transportation,
    get_alert,
    create_city,
    add_restaurant,
    add_transportation,
    add_alert,
    add_todo,
};
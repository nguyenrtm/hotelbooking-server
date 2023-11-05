const express = require("express");
const app = express();
const db = require('./config/db')

// const admin = require("firebase-admin");
// const credential = require("./key.json");
//
// admin.initializeApp({
//     credential: admin.credential.cert(credential)
// });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/hotel', require('./routes/hotel.route'))

app.post('/create', async (req, res) => {
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
});

app.post('/createFeedback', async (req, res) => {
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
});

app.post('/createRating', async (req, res) => {
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
});

app.get('/readHotel/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const document = db.collection("hotels").doc(id);
        const hotel = await document.get();
        const response = hotel.data();
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

app.get('/readFeedbackHotel/:id', async (req, res) => {
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
});

app.get('/readRatingHotel/:id', async (req, res) => {
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
});

// const db = admin.firestore();

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
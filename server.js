const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credential = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        const response = db.collection("users").doc(id).set(userJson);
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

const db = admin.firestore();

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
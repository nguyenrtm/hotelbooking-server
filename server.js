const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credential = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
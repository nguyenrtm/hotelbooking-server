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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
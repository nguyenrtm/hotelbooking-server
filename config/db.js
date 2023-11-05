const admin = require("firebase-admin");
const credential = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credential)
});

const db = admin.firestore();

module.exports = db;
const db = require("../config/db");

const getCities = async () => {
    const snapshot = await db.collection("cities").get();
    let result = {};
    snapshot.forEach(doc => {
        result[doc.id] = doc.data().name;
    });
    return result;
}

module.exports = {
    getCities
}
const router = require('express').Router()

router.get('/getAutoComplete', function (req, res) {
    const reqData = req.query.data;
    console.log("get search route")
    res.json([
        {
            type: 'city',
            name: "New York",
            country: "United States",
        },
        {
            type: 'city',
            name: "Tokyo",
            country: "Japan",
        },
        {
            type: 'city',
            name: "Paris",
            country: "France",
        },
        {
            type: 'hotel',
            name: "Hotel De Ville",
            country: "Vietnam",
        },
        {
            type: 'hotel',
            name: "Grand Hotel",
            country: "France",
        },
        {
            type: 'hotel',
            name: "Luxury Resort",
            country: "Maldives",
        },
    ]);
});

module.exports = router;

const router = require('express').Router()
const hotel_controller = require('../controllers/hotel.controller')


router.route("/")
    .get(hotel_controller.getAll)

router.route("/create")
    .post(hotel_controller.createHotel)

router.route("/createFeedback")
    .post(hotel_controller.createFeedback)

router.route("/createRating")
    .post(hotel_controller.createRating)

router.route('/search')
    .get(hotel_controller.search)

router.route("/readHotel/:id")
    .get(hotel_controller.getHotelById)

router.route("/readFeedbackHotel/:id")
    .get(hotel_controller.getFeedbackByHotelId)

router.route("/readRatingHotel/:id")
    .get(hotel_controller.getRatingByHotelId)

module.exports = router
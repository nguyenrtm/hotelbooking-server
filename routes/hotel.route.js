const router = require('express').Router()
const hotel_controller = require('../controllers/hotel.controller')


router.route("/")
    .get(hotel_controller.getAll)

router.route("/create")
    .post(hotel_controller.createHotel)

router.route('/search')
    .get(hotel_controller.search)

router.route("/:id")
    .get(hotel_controller.getHotelById)

router.route('/:id/feedbacks')
    .get(hotel_controller.getFeedbacks)

module.exports = router
const router = require('express').Router()
const hotel_controller = require('../controllers/hotel.controller')


router.route("/")
    .get(hotel_controller.getAll)

router.route("/:id")
    .get(hotel_controller.getHotelById)

router.route('/filter')
    .get(hotel_controller.filter)

module.exports = router
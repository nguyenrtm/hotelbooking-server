const router = require('express').Router()
const hotel_controller = require('../controllers/hotel.controller')


router.route("/")
    .get(hotel_controller.getAllForSearch)

router.route("/create")
    .post(hotel_controller.createHotel)

router.route('/search')
    .get(hotel_controller.search)

router.route("/:id")
    .get(hotel_controller.getHotelById)

router.route('/:id/feedbacks')
    .get(hotel_controller.getFeedbacks)

router.route('/favourite')
    .get(hotel_controller.getFavourites)
    .post(hotel_controller.addFavourite)
    .delete(hotel_controller.deleteFavourite)

module.exports = router
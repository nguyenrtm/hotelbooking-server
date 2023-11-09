const router = require('express').Router()
const reservation_controller = require('../controllers/reservation.controller')

router.route('/')
    .post(reservation_controller.create_reservation)

router.route('/history/:id')
    .get(reservation_controller.get_history)

router.route('/cancel/:id')
    .put(reservation_controller.cancel_reservation)

router.route('/createFeedback')
    .post(reservation_controller.create_feedback)

router.route('/getFeedback/:id')
    .get(reservation_controller.get_feedback)

module.exports = router
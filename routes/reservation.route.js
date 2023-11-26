const router = require('express').Router()
const reservation_controller = require('../controllers/reservation.controller')

router.route('/')
    .post(reservation_controller.create_reservation)

router.route('/active/:id')
    .get(reservation_controller.get_active)

router.route('/rated/:id')
    .get(reservation_controller.get_rated)

router.route('/notRated/:id')
    .get(reservation_controller.get_not_rated)

router.route('/cancel/:id')
    .get(reservation_controller.get_cancelled)
    .put(reservation_controller.cancel_reservation)

router.route('/createFeedback')
    .post(reservation_controller.create_feedback)

module.exports = router
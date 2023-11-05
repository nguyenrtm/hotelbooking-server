const router = require('express').Router()
const reservation_controller = require('../controllers/reservation.controller')

router.route('/')
    .post(reservation_controller.create_reservation)

router.route('/history')
    .get(reservation_controller.get_history)
const router = require('express').Router()
const cities_controller = require('../controllers/cities.controller')

router.route('/find/:id')
    .get(cities_controller.getCity)

router.route('/create')
    .post(cities_controller.createCity)

module.exports = router
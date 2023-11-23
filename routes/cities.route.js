const router = require('express').Router()
const cities_controller = require('../controllers/cities.controller')

router.route('/find')
    .get(cities_controller.get_all)

router.route('/find/:id')
    .get(cities_controller.get_city)

router.route('/restaurant/:id')
    .get(cities_controller.get_restaurant)

router.route('/todo/:id')
    .get(cities_controller.get_todo)

router.route('/transportation/:id')
    .get(cities_controller.get_transportation)

router.route('/alert/:id')
    .get(cities_controller.get_alert)
    
router.route('/create')
    .post(cities_controller.create_city)

router.route('/add-alert/:id')
    .post(cities_controller.add_alert)

router.route('/add-restaurant/:id')
    .post(cities_controller.add_restaurant)

router.route('/add-todo/:id')
    .post(cities_controller.add_todo)

router.route('/add-transportation/:id')
    .post(cities_controller.add_transportation)

module.exports = router
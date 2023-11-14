const router = require('express').Router()
const user_controller = require('../controllers/user.controller')

router.route('/find/:id')
    .get(user_controller.getUser)

router.route('/create')
    .post(user_controller.createUser)

module.exports = router
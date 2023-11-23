const router = require('express').Router()
const user_controller = require('../controllers/user.controller')

router.route('')
    .get(user_controller.get_all)

router.route('/:id')
    .get(user_controller.get_user)

router.route('/:id')
    .post(user_controller.create_user)

module.exports = router
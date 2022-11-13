const Router = require('express')
const router = new Router()
const studentController = require('../controlers/studentController')
router.post('/registration',studentController.registration)
router.post('/login',studentController.login)
router.get('/auth',studentController.check)

module.exports = router
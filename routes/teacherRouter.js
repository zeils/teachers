const Router = require('express')
const router = new Router()
const teacherController = require('../controlers/teacherController')
router.post('/registration',teacherController.registration)
router.post('/login',teacherController.login)
router.get('/auth',teacherController.check)
router.get('/',teacherController.getLessons)

module.exports = router
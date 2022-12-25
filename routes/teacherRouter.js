const Router = require('express')
const router = new Router()
const teacherController = require('../controlers/teacherController')
router.post('/registration',teacherController.registration)
router.post('/login',teacherController.login)
router.get('/auth',teacherController.check)
router.get('/all', teacherController.allTeachers) //
router.get('/homework', teacherController.getHomeWork) // Взять дз по id
router.post('/homework', teacherController.createHomeWork) // Создать ДЗ


module.exports = router
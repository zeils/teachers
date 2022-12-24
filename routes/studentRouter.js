const Router = require('express')
const router = new Router()
const studentController = require('../controlers/studentController')
router.post('/registration',studentController.registration)
router.post('/login',studentController.login)
router.get('/auth',studentController.check)
router.get('/one', studentController.oneChild) //взять ученика по id
router.get('/parent', studentController.parentChilds) // взять всех учеников по id родителя
router.get('/all', studentController.allChilds) // взять всех учеников

module.exports = router
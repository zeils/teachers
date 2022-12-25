const Router = require('express')
const router = new Router()
const lessonController = require('../controlers/lessonController')
router.get('/all', lessonController.getAll) // взять все уроки
router.get('/', lessonController.getOne) // взять один урок по id
router.post('/', lessonController.create) // создать урок
router.post('/remove', lessonController.delete) // удалить урок
router.post('/teacher', lessonController.enrollTeacher) // записать учителя на урок
router.post('/student', lessonController.enrollStudent) // записать ученика на урок
router.get('/teacher', lessonController.getEnrollTeacher) // посмотреть уроки учителя
router.get('/student', lessonController.getEnrollStudent) // посмотреть уроки ученика
router.get('/time', lessonController.getTimeId) //посмотреть время урока по id


module.exports = router
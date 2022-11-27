const Router = require('express')
const router = new Router()
const timetableController = require('../controlers/timetableController')

router.get('/timeTable', timetableController.getTimeTable)
router.post('/add',timetableController.addLesson)
router.post('/remove',timetableController.removeLesson)

module.exports = router
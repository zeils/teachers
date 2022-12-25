const Router = require('express')
const router = new Router()
const timetableController = require('../controlers/timetableController')

router.get('/', timetableController.getTimeTable)
router.post('/',timetableController.addLesson)
router.delete('/',timetableController.removeLesson)

module.exports = router
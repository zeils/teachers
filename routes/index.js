const Router = require('express')
const router = new Router()
const  lessonRouter = require('./lessonRouter')
const  parentRouter = require('./parentRouter')
const  studentRouter = require('./studentRouter')
const  teacherRouter = require('./teacherRouter')
const  timetableRouter = require('./timetableRouter')
const  moderatorRouter = require('./moderatorRouter')


router.use('/lesson',lessonRouter)
router.use('/parent',parentRouter)
router.use('/student',studentRouter)
router.use('/teacher', teacherRouter)
router.use('/timetable',timetableRouter)
router.use('/moderator', moderatorRouter)

module.exports = router
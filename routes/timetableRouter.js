const Router = require('express')
const router = new Router()
const timetableController = require('../controlers/timetableController')
router.post('/registration')
router.get('/id')

module.exports = router
const Router = require('express')
const router = new Router()
const lessonController = require('../controlers/lessonController')
router.get('/all', lessonController.getAll)
router.get('/', lessonController.getOne)
router.post('/', lessonController.create)
router.post('/remove', lessonController.delete)
module.exports = router
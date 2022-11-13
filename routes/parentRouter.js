const Router = require('express')
const router = new Router()
const ParentController = require('../controlers/parentController')
router.post('/registration', ParentController.registration)
router.post('/login', ParentController.login)
router.get('/auth', ParentController.check)
router.get('/student', ParentController.student)


module.exports = router
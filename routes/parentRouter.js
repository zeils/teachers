const Router = require('express')
const router = new Router()
const ParentController = require('../controlers/parentController')
router.post('/registration', ParentController.registration)
router.post('/login', ParentController.login)
router.get('/auth', ParentController.check)
router.delete('/', ParentController.deleteParent)
router.get('/all', ParentController.allParents)


module.exports = router
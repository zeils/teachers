const Router = require('express')
const router = new Router()
const ModeratorRouter = require('../controlers/moderatorController')
router.post('/registration', ModeratorRouter.registration)
router.post('/login', ModeratorRouter.login)
router.get('/auth', ModeratorRouter.check)
router.get('/all', ModeratorRouter.allModerators) // взять всех модераторов


module.exports = router
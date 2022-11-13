const Router = require('express')
const router = new Router()
const teacerController = require('../controlers/teacerController')
router.post('/registration')
router.get('/id')

module.exports = router
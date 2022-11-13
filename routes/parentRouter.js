const Router = require('express')
const router = new Router()
const parentController = require('../controlers/parentController')
router.post('/registration')
router.get('/id')

module.exports = router
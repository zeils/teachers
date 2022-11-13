const Router = require('express')
const router = new Router()
const lessonController = require('../controlers/lessonController')
router.post('/registration')
router.get('/id')
router.get('/auth',(req,res)=>{res.json({message:'all'})})
module.exports = router
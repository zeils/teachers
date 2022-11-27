const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Student, Lesson, StudentLesson} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class StudentController {


    async registration(req, res, next) {
        console.log('типа регистрация!')
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password' + email + ' ' + password))
        }
        const candidate = await Student.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await Student.create({email, password: hashPassword})

        const token = generateJwt(user.id, user.email)

        return res.json(token)
    }

    async login(req, res, next) {
        try {
        const {email, password} = req.body
        const user = await Student.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
            
        } catch (error) {
            console.log(error)
        }
        
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }


    async getLessons(req,res){
        try {

        const {id} = req.body
            
        let lessons;
       

        lessons = await StudentLesson.findAll(
            {where:{id}}
        ,)


        return res.json(lessons)
        } catch (e) {
            console.log('ошибка ' + e)

            next(ApiError.badRequest(e.message))
            
        }
 
    }




}

module.exports = new StudentController()
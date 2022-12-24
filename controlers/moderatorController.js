const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Teacher, Lesson, TeacherLesson, Timetable, HomeWork, Moderator} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class ModeratorController {


    async registration(req, res, next) {
        console.log('типа регистрация!')
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password' + email + ' ' + password))
        }
        const candidate = await Moderator.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await Moderator.create({email, password: hashPassword})

        const token = generateJwt(user.id, user.email)

        return res.json(token)
    }

    async login(req, res, next) {
        try {
        const {email, password} = req.body
        const user = await Moderator.findOne({where: {email}})
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

    async allModerators (req, res, next) { 
        try {
            const moderators = await Moderator.findAll(
                {
                }
            )

            return res.json({moderators})

    
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(e.message))
        }

    }





}

module.exports = new ModeratorController()
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Teacher} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class ParentController {
    async registration(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Teacher.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const teacher = await Teacher.create({email, password: hashPassword})
        const token = generateJwt(teacher.id, teacher.email, teacher.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const teacher = await teacher.findOne({where: {email}})
        if (!teacher) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let compaarePassword = bcrypt.compareSync(password, teacher.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(teacher.id, teacher.email, teacher.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.teacher.id, req.teacher.email, req.teacher.role)
        return res.json({token})
    }
}

module.exports = new TeacherController()
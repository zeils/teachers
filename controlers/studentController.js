const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Student, Lesson, StudentLesson} = require('../models/models')
const {DataTypes} = require("sequelize");

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
        const {email, password, name, age, parentId } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password' + email + ' ' + password))
        }
        const candidate = await Student.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await Student.create({email, password: hashPassword, name, age, parentId})

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

    async deleteStudent(req, res, next) {
        try {
            const {email} = req.body
            const user = await Student.destroy({where: {email}})
            
            return res.json({user})
                
            } catch (error) {
                console.log(error)
            }
    }

    async oneChild(req, res, next) { // взять ребенка по id
        try {
            const {id} = req.body
            const student = await Student.findOne(
                {
                    where: {id}
                }
            )

            return res.json({student})

    
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(e.message))
        }

    }

    async parentChilds(req, res, next) { // взять всех детей по id выбранного родителя
        try {
            const {parentId} = req.body
            const students = await Student.findAll(
                {
                    where: {parentId}
                }
            )

            return res.json({students})

    
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(e.message))
        }

    }

    async allChilds (req, res, next) { // взять всех детей 
        try {
            const students = await Student.findAll(
                {
                }
            )

            return res.json({students})

    
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(e.message))
        }

    }




}

module.exports = new StudentController()
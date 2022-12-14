const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Parent, Student} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class ParentController {


    async registration(req, res, next) {
        const {email, password, name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password' + email + ' ' + password))
        }
        const candidate = await Parent.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Parent.create({email, password: hashPassword, name})
        const token = generateJwt(user.id, user.email)
        return res.json(token)
    }

    async login(req, res, next) {
        try {
        const {email, password,name} = req.body
        const user = await Parent.findOne({where: {email}})
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



    async deleteParent(req, res, next) {
        try {
            const {email} = req.body
            const user = await Parent.destroy({where: {email , name}})
            
            return res.json({user})
                
            } catch (error) {
                console.log(error)
            }
    }

    async allParents (req, res, next) { 
        try {
            const parents = await Parent.findAll(
                {
                }
            )

            return res.json({parents})

    
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new ParentController()
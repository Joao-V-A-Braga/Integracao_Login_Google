const { authSecret } = require('../.env')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        const encode = require('jwt-encode')

        try {
            if (!req.body.email || !req.body.password) throw 'É necessário preencher os campos.'

            const userData = await app.db('users')
                .where({ email: req.body.email })
                .first()

            if (!userData) throw 'Usuário não encontrado.'

            const validator = bcrypt.compareSync(req.body.password, userData.password)
            
            if (!validator) throw 'Email/Senha inválidos.'
            
            const now = Date.now() / 1000
            
            const payload = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                admin: userData.admin || false,
                iat:now,
                exp: now + (60 * 60 * 24)
            }
            const token = encode(payload, authSecret)
            res.json({
                ...payload,
                token: token

            })
        } catch (msg) {
            return res.status(400).send(msg)
        }

    }

    const validateToken = (req, res) => {
        const userData = req.body || null
        const decode = require('jwt-decode')

        try {
            if (userData) {
                const token = decode(userData.token)
                if (new Date(token.exp * 1000) > new Date()) return res.status(201).send(true)
            }
        } catch (e) {

        }
        res.send(false)

    }

    return { signin, validateToken }
}
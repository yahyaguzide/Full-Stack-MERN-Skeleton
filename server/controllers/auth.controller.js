import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from '../../config/config'

const signin = async (req, res) => {
    try {
        // NOTE: Try to find a user by email
        let user = await User.findOne({
            "email": req.body.email
        })

        // If no user was found return error
        if(!user) {
            return res.status('401').json({error: "User not found"})
        }
        // If user Authentication does not return True, raise error
        if(!user.authenticate(req.body.password)) {
            return res.status('401').json({ error: "Email and password don't match" })
        }

        // If everything is allright create a token
        const token = jwt.sign({ _id: user._id }, config.jwtSecret)

        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch(err) {
        return res.status('401').json({ error: "Could not sign in" })
    }
}

const singout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profiles && req.auth && req.profile._id == req.auth._id
    if(!authorized) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

export default {signin, singout, requireSignin, hasAuthorization }
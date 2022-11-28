import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../.. /config/config'

const signin = (req, res) => {// TODO:
}

const singout = (req, res) => {// TODO:
}

const requireSignin = null // TODO:

const hasAuthorization = (req, res) => {// TODO:
}

export default {signin, singout, requireSignin, hasAuthorization }
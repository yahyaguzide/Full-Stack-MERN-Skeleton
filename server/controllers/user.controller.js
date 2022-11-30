import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import { json } from 'body-parser'
import { validate } from 'schema-utils'

/* NOTE: page: 172 Full-Stack React Projecs, Second Edition
lodash is a JavaScript library that provides utility functions
for common programming tasks, including the manipulation of arrays and objects.
*/

const create = async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch(err) {
        console.log("Error occured while creating: "+ err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch(err) {
        console.log("Error occured while listing: "+ err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if(!user) {
            return res.status('400').json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    } catch(err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res, next) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch(err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch(err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, userById, read, list, remove, update }
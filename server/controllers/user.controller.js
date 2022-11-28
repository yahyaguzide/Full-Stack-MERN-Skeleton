import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './error.controller'
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
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email update created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userById = (req, res, nex, id) => {
    // TODO:
}

const read = (req, res) => {
    // TODO:
}

const update = (req, res, next) => {
    // TODO:
}

const remove = (req, res, next) => {
    // TODO:
}

export default { create, userById, read, list, remove, update }
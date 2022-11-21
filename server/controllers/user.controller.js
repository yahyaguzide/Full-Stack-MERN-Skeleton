import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './error.controller'

/* NOTE: page: 172 Full-Stack React Projecs, Second Edition
lodash is a JavaScript library that provides utility functions
for common programming tasks, including the manipulation of arrays and objects.
*/

const create = (req, res, next) => {
    // TODO:
}

const list = (req, res) => {
    // TODO:
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
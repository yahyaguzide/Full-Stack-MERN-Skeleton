import express  from "express";
import userCtl from '../controllers/user.controllers'

const router = express.Router();

router.route('/api/users')
    .get(userCtl.list)
    .post(userCtl.create)

router.route('/api/users/:userId')
    .get(userCtl.read)
    .put(userCtl.update)
    .delete(userCtl.remove)

router.param('userId', userCtl.userById)

export default router
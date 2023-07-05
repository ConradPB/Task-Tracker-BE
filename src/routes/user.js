import express from 'express'
import User from '../controllers/user'

const router = express.Router()

const userController = new User

router.get('/', (req, res, next) => userController.fetchUsers(req, res, next))
  
router.get('/:userId', (req, res, next) => userController.fetchUser(req, res, next))

router.post('/', (req, res, next) => userController.registerUser(req, res, next))

router.post('/login', (req, res, next) => userController.loginUser(req, res, next))

export default router
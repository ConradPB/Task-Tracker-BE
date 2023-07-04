import express from 'express'
import User from '../controllers/user'

const router = express.Router()

const userController = new User

router.get('/', userController.fetchUsers)
  
router.get('/:userId', userController.fetchUser)

router.post('/', userController.registerUser)

router.post('/login', userController.loginUser)

export default router
import express from 'express'
import User from '../controllers/user'

const router = express.Router()

const userController = new User

router.get('/', userController.fetchUsers)
  
router.get('/:userId', userController.fetchUser)

router.post('/', userController.createUser)

export default router
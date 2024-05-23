import express from 'express'
import userController from '../controller/user'

const router = express.Router()

router.get('/api/users', userController.getUsers)
router.post('/api/users', userController.addUser)
router.get('/api/users/:id', userController.getUserById)
router.put('/api/users/:id', userController.updateUserById)
router.delete('/api/users/:id', userController.deleteUserById)

export default router
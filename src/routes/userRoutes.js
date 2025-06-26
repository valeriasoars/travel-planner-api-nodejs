import express from 'express'
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
router.get("/",  authMiddleware, userController.getUser)
router.delete("/", authMiddleware, userController.removeUser)


export default router
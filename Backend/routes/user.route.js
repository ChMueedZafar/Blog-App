import express from 'express'
import { register, login, logout, GetMyProfile,getadmins } from '../controller/user.controller.js'
import { isAuthenticated } from '../MiddleBare/Auth.User.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.get('/logout', isAuthenticated, logout)

router.get('/my-profile', isAuthenticated, GetMyProfile);

router.get('/admins', getadmins);


export default router;
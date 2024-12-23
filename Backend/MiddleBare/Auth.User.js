import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

// Authentication
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        console.log("auth token", token)
    } catch (error) {
        console.log("error in isAuthenticated", error)
        return res.status(401).json({message: 'user not authenticated'})
    }
}

    //Authorization

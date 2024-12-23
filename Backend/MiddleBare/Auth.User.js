import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

// Authentication
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message: 'user not authenticated'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({message: 'user not found'})
        }  
        req.user = user
        next()
    } catch (error) {
        console.log("error in isAuthenticated", error)
        return res.status(401).json({message: 'user not authenticated'})
    }
}

    //Authorization
export const isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: `user with given role ${req.user.role} is not allowed`})
        }
        next()
    }
}

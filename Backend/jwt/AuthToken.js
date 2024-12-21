import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'

export const createTokenAndsavecookies = async (userId, res) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, 
        {
            expiresIn: "7d"
        })
    res.cookie("jwt", token, {
        httpOnly: true,     
        secure: true,
        sameSite:"strict"
    })
    await User.findByIdAndUpdate(userId, {token: token})
    return token
}

export default createTokenAndsavecookies;

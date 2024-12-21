import { User } from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs'
import { createTokenAndsavecookies } from '../jwt/AuthToken.js'

// Register User
export const register = async (req, res) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                message: "user photo is required"
            })
        }
        const {photo} = req.files;
        const allowformats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
        if(!allowformats.includes(photo.mimetype)){
            return res.status(400).json({
                message: "invalid photo format. only jpg, jpeg, png, webp are allowed"
            })
        }
    
        const {name, email, password, phone, education, role} = req.body
        if(!name || !email || !password || !phone || !education || !role || !photo){
            return res.status(400).json({
                success: false,
                message: "Please fill required fields"
            })
        }
    
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newUser = new User({
            name, 
            email, 
            password: hashedPassword, 
            phone,
            education, 
            role, 
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });
    
        await newUser.save()
        if(newUser){
            const token = await createTokenAndsavecookies(newUser._id, res)
            return res.status(201).json({
                message: "User Registered successfully", 
                newUser, 
                token: token
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

// Login User
export const login = async (req, res) => {
    const {email, password, role} = req.body
    try {
        if(!email || !password || !role){
            return res.status(400).json({
                message: "Please fill required fields"
            })
        }
        const user = await User.findOne({email}).select("+password")
        if(!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }
        
        if(!user.password){
            return res.status(400).json({
                message: "User Password is Missing"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Email or Password"
            })
        }

        if (user.role !== role){
            return res.status(400).json({
                message: `Given Role ${role} not found`
            })
        }

        const token = await createTokenAndsavecookies(user._id, res)
        return res.status(200).json({
            message: "User Logged In Successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token,
        });
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

// Logout User
export const logout = async (req, res) => {
   try {
    res.clearCookie("jwt")   
    return res.status(200).json({
        message: "User Logged Out Successfully"
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message: "Internal Server Error"
    })
   }
}



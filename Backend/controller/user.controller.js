import { User } from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary';

export const register = async (req, res) => {
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

    const newUser = new User({
        name, 
        email, 
        password, 
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
    return res.status(201).json({
        message: "User Registered successfully", newUser
    })
   }
    
};

import { User } from "../models/user.model.js"

export const register = async (req, res) => {
    const {name, email, password, phone, photo, education, role} = req.body
    if(!name || !email || !password || !phone || !education || !role){
        return res.status(400).json({
            success: false,
            message: "Please fill required fields"
        })
    }
    const user =User.findOne({email})
    if(user){
        return res.status(400).json({
            success: false,
            message: "User already exists with this email"
        })
    }
    const newUser = new User({name, email, password, phone, photo, education, role});
   await newUser.save()
   if(newUser){
    return res.status(201).json({
        message: "User Registered successfully"
    })
   }
    
};

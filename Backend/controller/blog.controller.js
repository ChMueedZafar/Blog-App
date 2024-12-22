import { Blog } from "../models/blog.model.js"
import { v2 as cloudinary } from 'cloudinary';

// Blog Register 
export const createBlog = async (req, res) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({
                message: "blog image is required"
            })
        }
        const {blogImage} = req.files;
        const allowformats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
        if(!allowformats.includes(blogImage.mimetype)){
            return res.status(400).json({
                message: "invalid photo format. only jpg, jpeg, png, webp are allowed"
            })
        }
    
        const {title, category, about} = req.body
        if(!title || !category || !about) {
            return res.status(400).json({
                success: false,
                message: "title, category, about is required fields"
            })
        }
        const adminName = req.user.name
        const adminPhoto = req.user.photo
        const createdBy = req.user._id

        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error)
        }    
        const blogData =({
            title, 
            category, 
            about,
            adminName, 
            adminPhoto, 
            createdBy,
            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });
    
       const blog = await Blog.create(blogData);
       res.status(201).json({
            message: "Blog created successfully", 
            blog
       });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
};


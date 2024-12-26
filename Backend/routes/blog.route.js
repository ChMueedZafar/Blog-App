import express from 'express'
import { createBlog, deleteBlog ,GetAllBlogs, GetSingleBlog,GetMyBlogs,updateBlog} from '../controller/blog.controller.js'
import { isAuthenticated, isAdmin } from '../MiddleBare/Auth.User.js'

const router = express.Router()

router.post('/create', isAuthenticated, isAdmin('admin'), createBlog)
router.delete('/delete/:id', isAuthenticated, isAdmin('admin'), deleteBlog);
router.get('/all-blogs', isAuthenticated, GetAllBlogs);
router.get('/single-blog/:id', isAuthenticated, GetSingleBlog);
router.get('/my-blogs', isAuthenticated,isAdmin('admin'), GetMyBlogs);
router.put('/update/:id', isAuthenticated, isAdmin('admin'), updateBlog);

export default router;
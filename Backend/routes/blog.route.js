import express from 'express'
import { createBlog, deleteBlog ,GetAllBlogs} from '../controller/blog.controller.js'
import { isAuthenticated, isAdmin } from '../MiddleBare/Auth.User.js'

const router = express.Router()

router.post('/create', isAuthenticated, isAdmin('admin'), createBlog)

router.delete('/delete/:id', isAuthenticated, isAdmin('admin'), deleteBlog);
router.get('/all-blogs', isAuthenticated, GetAllBlogs);

export default router;
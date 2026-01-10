import express from 'express';
import { blogController } from './blogs.controller.js';

const router = express.Router();

router.post('/', blogController.createBlogs);
router.get('/admin', blogController.getAllBlogsForAdmin);
router.get('/:id', blogController.getSingleBlog);
export const blogsRouter = router;
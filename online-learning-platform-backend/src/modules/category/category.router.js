import express from 'express';
import { categoryController } from './category.controller.js';

const router = express.Router();

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getSingleCategoryById)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
router.get('/active/list', categoryController.getActiveCategories)

export const categoryRouter = router;
import express from 'express';
import { InstructorController } from './instructor.controller.js';

const router = express.Router();

router.post('/', InstructorController.createInstructor)
router.get('/', InstructorController.getAllInstructors)
router.get('/:id', InstructorController.getSingleInstructor)
router.patch('/:id/suspend', InstructorController.suspendInstructor)
router.get('/admin/counts', InstructorController.getInstructorCountForAdmin)
router.get('/admin/active', InstructorController.getActiveInstructors)

export const InstructorRouter = router;
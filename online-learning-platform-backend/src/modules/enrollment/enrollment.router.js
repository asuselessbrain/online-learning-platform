import express from 'express';
import { enrollmentController } from './enrollment.controller.js';

const router = express.Router();

router.post('/', enrollmentController.enrollInCourse);
router.get('/course/:courseId', enrollmentController.getSingleEnrollment)
router.get('/single-course/:userId/:courseId', enrollmentController.getSingleEnrolledCourse)
router.get('/:userId/:courseId', enrollmentController.isEnrolled)
router.get('/:userId', enrollmentController.enrolledCourses)
router.patch('/:enrollmentId/:lectureId/:courseId', enrollmentController.addCompletedLesson)
export const enrollmentRouter = router;
import express from 'express';
import { enrollmentController } from './enrollment.controller.js';

const router = express.Router();

router.post('/enroll', enrollmentController.enrollInCourse);
router.delete('/unenroll', enrollmentController.unenrollFromCourse);
router.get('/my-enrollments', enrollmentController.getMyEnrollments);
router.get('/courses/:courseId/enrollments', enrollmentController.getCourseEnrollments);
router.put('/enrollments/:studentEmail/:courseId', enrollmentController.updateEnrollment);
router.get('/enrollments/:studentEmail/:courseId', enrollmentController.getEnrollmentStatus);
router.get('/monthly-stats', enrollmentController.getMonthlyEnrollmentStats);
router.get('/stats', enrollmentController.getEnrollmentStats);

export const enrollmentRouter = router;
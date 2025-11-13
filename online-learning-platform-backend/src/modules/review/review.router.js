import express from 'express';
import { reviewController } from './review.controller.js';

const router = express.Router();

router.post('/', reviewController.createReview);

router.put('/', reviewController.updateReview);

router.delete('/:courseId', reviewController.deleteReview);

router.get('/course/:courseId', reviewController.getCourseReviews);

router.get('/course/:courseId/stats', reviewController.getCourseRatingStats);

router.get('/my-reviews', reviewController.getMyReviews);

router.get('/my-review/:courseId', reviewController.getMyReviewForCourse);

router.get('/overall-stats', reviewController.getOverallRatingStats);

export const reviewRouter = router;
import express from 'express';
import { reviewController } from './review.controller.js';

const router = express.Router();

// Create a review
router.post('/', reviewController.createReview);

// Update a review
router.put('/', reviewController.updateReview);

// Delete a review
router.delete('/:courseId', reviewController.deleteReview);

// Get all reviews for a course
router.get('/course/:courseId', reviewController.getCourseReviews);

// Get rating stats for a course
router.get('/course/:courseId/stats', reviewController.getCourseRatingStats);

// Get my reviews
router.get('/my-reviews', reviewController.getMyReviews);

// Get my review for a specific course
router.get('/my-review/:courseId', reviewController.getMyReviewForCourse);

// Get overall rating statistics
router.get('/overall-stats', reviewController.getOverallRatingStats);

export const reviewRouter = router;
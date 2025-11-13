import { reviewService } from './review.services.js';

const createReview = async (req, res) => {
    try {
        const { courseId, rating, review, studentEmail } = req.body;

        if (!studentEmail) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required - studentEmail is required'
            });
        }

        if (!courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: 'courseId, rating, and review are required'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const result = await reviewService.createReview(courseId, studentEmail, rating, review);
        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to create review'
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const { courseId, rating, review, studentEmail } = req.body;

        if (!studentEmail) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required - studentEmail is required'
            });
        }

        if (!courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: 'courseId, rating, and review are required'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const result = await reviewService.updateReview(courseId, studentEmail, rating, review);
        res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update review'
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { studentEmail } = req.body;

        if (!studentEmail) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required - studentEmail is required'
            });
        }

        await reviewService.deleteReview(courseId, studentEmail);
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to delete review'
        });
    }
};

const getCourseReviews = async (req, res) => {
    try {
        const { courseId } = req.params;
        const result = await reviewService.getCourseReviews(courseId);
        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch reviews'
        });
    }
};

const getCourseRatingStats = async (req, res) => {
    try {
        const { courseId } = req.params;
        const result = await reviewService.getCourseRatingStats(courseId);
        res.status(200).json({
            success: true,
            message: 'Rating stats fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch rating stats'
        });
    }
};

const getMyReviews = async (req, res) => {
    try {
        const { studentEmail } = req.query;

        if (!studentEmail) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required - studentEmail is required'
            });
        }

        const result = await reviewService.getStudentReviews(studentEmail);
        res.status(200).json({
            success: true,
            message: 'Reviews fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch reviews'
        });
    }
};

const getMyReviewForCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { studentEmail } = req.query;

        if (!studentEmail) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required - studentEmail is required'
            });
        }

        const result = await reviewService.getReviewById(courseId, studentEmail);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Review fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch review'
        });
    }
};

const getOverallRatingStats = async (req, res) => {
    try {
        const result = await reviewService.getOverallRatingStats();
        res.status(200).json({
            success: true,
            message: 'Overall rating statistics fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch overall rating statistics'
        });
    }
};

export const reviewController = {
    createReview,
    updateReview,
    deleteReview,
    getCourseReviews,
    getCourseRatingStats,
    getMyReviews,
    getMyReviewForCourse,
    getOverallRatingStats,
};
import { Review } from './review.model.js';
import { Enrollment } from '../enrollment/enrollment.model.js';
import mongoose from 'mongoose';
import AppError from '../../middleWares/appError.js';

const createReview = async (courseId, studentEmail, rating, review) => {
    const enrollment = await Enrollment.findOne({ studentEmail, courseId });
    if (!enrollment) {
        throw new AppError(403, 'You must be enrolled in this course to leave a review');
    }

    const existingReview = await Review.findOne({ courseId, studentEmail });
    if (existingReview) {
        throw new AppError(409, 'You have already reviewed this course');
    }

    const newReview = await Review.create({ courseId, studentEmail, rating, review });
    return newReview;
};

const updateReview = async (courseId, studentEmail, rating, review) => {
    const updatedReview = await Review.findOneAndUpdate(
        { courseId, studentEmail },
        { rating, review, updatedAt: Date.now() },
        { new: true }
    );

    if (!updatedReview) {
        throw new AppError(404, 'Review not found');
    }

    return updatedReview;
};

const deleteReview = async (courseId, studentEmail) => {
    const deletedReview = await Review.findOneAndDelete({ courseId, studentEmail });
    if (!deletedReview) {
        throw new AppError(404, 'Review not found');
    }
    return deletedReview;
};

const getCourseReviews = async (courseId) => {
    const reviews = await Review.find({ courseId })
        .populate('courseId', 'title')
        .sort({ createdAt: -1 });
    return reviews;
};

const getCourseRatingStats = async (courseId) => {
    const stats = await Review.aggregate([
        { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 },
                ratings: { $push: '$rating' }
            }
        },
        {
            $project: {
                averageRating: { $round: ['$averageRating', 1] },
                totalReviews: 1,
                ratingDistribution: {
                    1: { $size: { $filter: { input: '$ratings', cond: { $eq: ['$$this', 1] } } } },
                    2: { $size: { $filter: { input: '$ratings', cond: { $eq: ['$$this', 2] } } } },
                    3: { $size: { $filter: { input: '$ratings', cond: { $eq: ['$$this', 3] } } } },
                    4: { $size: { $filter: { input: '$ratings', cond: { $eq: ['$$this', 4] } } } },
                    5: {
                        $size: { $filter: { input: '$ratings', cond: { $eq: ['$$this', 5] } } }
                    }
                }
            }
        }
    ]);

    return stats[0] || { averageRating: 0, totalReviews: 0, ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
};

const getStudentReviews = async (studentEmail) => {
    const reviews = await Review.find({ studentEmail })
        .populate('courseId', 'title thumbnail')
        .sort({ createdAt: -1 });
    return reviews;
};

const getReviewById = async (courseId, studentEmail) => {
    const review = await Review.findOne({ courseId, studentEmail });
    return review;
};

const getOverallRatingStats = async () => {
    const stats = await Review.aggregate([
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 },
                coursesWithReviews: { $addToSet: '$courseId' }
            }
        },
        {
            $project: {
                averageRating: { $round: ['$averageRating', 1] },
                totalReviews: 1,
                totalCoursesWithReviews: { $size: '$coursesWithReviews' }
            }
        }
    ]);

    return stats[0] || { averageRating: 0, totalReviews: 0, totalCoursesWithReviews: 0 };
};

export const reviewService = {
    createReview,
    updateReview,
    deleteReview,
    getCourseReviews,
    getCourseRatingStats,
    getStudentReviews,
    getReviewById,
    getOverallRatingStats,
};
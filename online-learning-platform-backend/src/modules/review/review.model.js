import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    studentEmail: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

reviewSchema.index({ courseId: 1, studentEmail: 1 }, { unique: true });

reviewSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const Review = mongoose.model('Review', reviewSchema);
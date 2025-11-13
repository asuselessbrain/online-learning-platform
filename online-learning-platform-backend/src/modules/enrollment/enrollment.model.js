import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentEmail: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['enrolled', 'completed', 'dropped'], default: 'enrolled' },
    progress: { type: Number, default: 0 }, // percentage
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
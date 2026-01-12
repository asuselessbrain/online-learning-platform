import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'NewCourse', required: true },
    status: {
        type: String,
        enum: ["pending", "active", "completed", "cancelled"],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "failed"],
        default: "unpaid",
    },
    paymentId: {
        type: String,
        default: ""
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: { type: Date, default: "" },

    // --- Progress Tracking ---
    completedLectures: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Lecture", default: []
    }],
    progressPercentage: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
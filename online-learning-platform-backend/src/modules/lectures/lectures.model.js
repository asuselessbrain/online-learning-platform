import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    },

    title: { type: String, required: true, trim: true },

    lectureNo: { type: String, required: true },

    type: {
        type: String,
        enum: ["video", "document", "text", "quiz"],
        default: "video",
    },

    videoUrl: { type: String },
    documentUrl: { type: String },
    content: { type: String },
    duration: { type: Number, default: 0 },

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },

}, { timestamps: true });

export const Lecture = mongoose.model("Lecture", LectureSchema)

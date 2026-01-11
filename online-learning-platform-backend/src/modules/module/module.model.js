import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
    },
    title: { type: String, required: true, trim: true },
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
        default: [],
    }],
    moduleNo: { type: String, required: true},
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    duration: { type: Number, default: 0 },
}, { timestamps: true });

ModuleSchema.index({
    courseId: 1,
    title: 1
},
    { unique: true })


export const ModuleModel = mongoose.model('Module', ModuleSchema)


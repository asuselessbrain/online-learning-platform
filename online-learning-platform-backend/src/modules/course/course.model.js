import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    price: { type: Number, default: 0 },
    duration: { type: String },
    level: { type: String },
    tags: [{ type: String }],
    thumbnail: { type: String },
    instructorName: { type: String },
    instructorEmail: { type: String },
    instructorPhoto: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export const Course = mongoose.model('Course', courseSchema);

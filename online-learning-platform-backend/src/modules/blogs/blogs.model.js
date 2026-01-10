import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    subTitle: String,
    tags: [String],
    thumbnail: String,
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    content: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const blogModel = mongoose.model('Blog', blogSchema);
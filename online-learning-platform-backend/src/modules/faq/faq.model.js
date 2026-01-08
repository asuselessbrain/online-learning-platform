import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required'],
    },
    answer: {
        type: String,
        required: [true, 'Answer is required'],
    },
    category: {
        type: String,
        enum: ['enrollment', 'payments', 'technical', 'certificates', 'courses', 'others'],
        required: [true, 'Category is required'],
    },
    status: {
        type: String,
        enum: ['unpublished', 'published'],
        default: 'unpublished'
    }

}, { timestamps: true })

export const faqModel = mongoose.model('FAQ', faqSchema);
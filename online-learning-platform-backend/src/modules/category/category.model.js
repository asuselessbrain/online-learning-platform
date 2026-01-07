import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxlength: 120,
    },
    description: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

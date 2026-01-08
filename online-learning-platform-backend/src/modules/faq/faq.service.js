import { faqModel } from "./faq.model.js";

const createFAQ = async (faqData) => {
    const result = new faqModel(faqData);
    return await result.save();
}

const getAllFAQ = async (options) => {
    const filter = {}
    if (options.searchTerm) {
        filter.$or = [
            { question: { $regex: options.searchTerm, $options: 'i' } },
            { answer: { $regex: options.searchTerm, $options: 'i' } },
            { category: { $regex: options.searchTerm, $options: 'i' } },
        ]
    }

    if (options.category) {
        filter.category = options.category;
    }

    if (options.status) {
        filter.status = options.status;
    }

    const sort = {}

    if (options.sortBy && options.sortOrder) {
        sort[options.sortBy] = options.sortOrder === 'asc' ? 1 : -1;
    }

    const limit = options.limit ? parseInt(options.limit, 10) : 10;
    const page = options.page ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const faqs = await faqModel.find(filter).sort(sort).skip(skip).limit(limit);

    const total = await faqModel.countDocuments(filter);

    return {
        meta: {
            total,
            page,
            limit
        },
        data: faqs,
    }
}

const getSingleFAQ = async (faqId) => {
    return await faqModel.findById(faqId);
}

const updateFAQ = async (faqId, faqData) => {
    return await faqModel.findByIdAndUpdate(faqId, faqData, { new: true });
}

const deleteFAQ = async (faqId) => {
    return await faqModel.findByIdAndDelete(faqId);
}

export const faqService = {
    createFAQ,
    getAllFAQ,
    getSingleFAQ,
    updateFAQ,
    deleteFAQ
};
import { faqModel } from "./faq.model.js";

const createFAQ = async (faqData) => {
    const result = new faqModel(faqData);
    return await result.save();
}

export const faqService = {
    createFAQ,
};
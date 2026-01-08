import { faqService } from "./faq.service.js";

const createFAQ = async (req, res) => {
    try {
        const faqData = req.body;
        console.log(faqData)
        const result = await faqService.createFAQ(faqData);
        res.status(201).json({
            success: true,
            message: "FAQ created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create FAQ",
            error: error
        });
    }
}

const getAllFAQ = async (req, res) => {
    const options = req.query;

    try {
        const result = await faqService.getAllFAQ(options);
        res.status(200).json({
            success: true,
            message: "FAQs retrieved successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve FAQs",
            error: error
        });
    }
}
export const faqController = {
    createFAQ,
    getAllFAQ,
};
import { faqService } from "./faq.service.js";

const createFAQ = async (req, res) => {
    try {
        const faqData = req.body;
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

export const faqController = {
    createFAQ,
};
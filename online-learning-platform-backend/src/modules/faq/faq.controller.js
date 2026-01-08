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

const getSingleFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await faqService.getSingleFAQ(id);
        res.status(200).json({
            success: true,
            message: "FAQ retrieved successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve FAQ",
            error: error
        });
    }
}

const updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const faqData = req.body;
        const result = await faqService.updateFAQ(id, faqData);
        res.status(200).json({
            success: true,
            message: "FAQ updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update FAQ",
            error: error
        });
    }
}

export const faqController = {
    createFAQ,
    getAllFAQ,
    getSingleFAQ,
    updateFAQ
};
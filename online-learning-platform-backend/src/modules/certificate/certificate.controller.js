import { certificateService } from "./certificate.service.js";

const createCertificate = async (req, res) => {
    const certificateData = req.body;

    try {
        const result = await certificateService.createCertificate(certificateData);
        res.status(201).json({
            message: "Certificate created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create certificate",
            error: error,
        });
    }
}

const getSingleUserCertificate = async (req, res) => {
    const { userId } = req.params

    try {
        const result = await certificateService.getSingleUserCertificates(userId, req.query);
        res.status(200).json({
            message: "Certificate fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch certificate",
            error: error,
        });
    }
}

export const certificateController = {
    createCertificate,
    getSingleUserCertificate
}
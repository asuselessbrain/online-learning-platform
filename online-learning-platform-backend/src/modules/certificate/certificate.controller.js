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

export const certificateController = {
    createCertificate
}
import { dashboardDataServices } from "./dashboardData.service.js";

const getStudentDashboardData = async (req, res) => {
    const { userId } = req.params
    try {
        const result = await dashboardDataServices.getStudentDashboardData(userId);
        res.status(200).json({
            success: true,
            message: "Student Dashboard data fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch Student Dashboard data"
        });
    }
}

export const dashboardDataController = {
    getStudentDashboardData
}

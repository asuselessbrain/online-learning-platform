import mongoose from "mongoose"
import { certificate } from "../certificate/certificate.model.js"
import { Enrollment } from "../enrollment/enrollment.model.js"

const getStudentDashboardData = async (userId) => {
    const enrolledCourseCount = await Enrollment.countDocuments({ userId: userId })

    const now = new Date()

    const startData = new Date(now.getFullYear(), now.getMonth(), 1)
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const prevEnd = new Date(now.getFullYear(), now.getMonth(), 1)


    const currentMonthEnrolled = await Enrollment.countDocuments({ userId: userId, enrolledAt: { $gte: startData, $lt: endDate } })

    const certificatesEarned = await certificate.countDocuments({ studentId: userId });

    const currentMonthCertificatesEarned = await certificate.countDocuments({ studentId: userId, issuedAt: { $gte: startData, $lt: endDate } })

    const avg = await Enrollment.aggregate([{ $match: { userId: new mongoose.Types.ObjectId(userId) } }, { $group: { _id: null, averageProgress: { $avg: "$progressPercentage" } } }])

    const avgProgress = avg.length > 0 ? avg[0].averageProgress : 0

    const currentMonthAvgAgg = await Enrollment.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId), enrolledAt: { $gte: startData, $lt: endDate } } },
        { $group: { _id: null, avgProgress: { $avg: "$progressPercentage" } } }
    ])

    const currentMonthAvgProgress = currentMonthAvgAgg.length > 0 ? currentMonthAvgAgg[0].avgProgress : 0

    const prevMonthAvgAgg = await Enrollment.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId), enrolledAt: { $gte: prevStart, $lt: prevEnd } } },
        { $group: { _id: null, avgProgress: { $avg: "$progressPercentage" } } }
    ])

    const prevMonthAvgProgress = prevMonthAvgAgg.length > 0 ? prevMonthAvgAgg[0].avgProgress : 0

    let percentageIncrease = 0;

    if (prevMonthAvgProgress === 0) {
        if (currentMonthAvgProgress > 0) {
            percentageIncrease = 100;  // full increase
        } else {
            percentageIncrease = 0;    // no change
        }
    } else {
        const diff = currentMonthAvgProgress - prevMonthAvgProgress;
        percentageIncrease = (diff / prevMonthAvgProgress) * 100;
    }

    const completedCourse = await Enrollment.countDocuments({ userId: userId, completed: true })

    return {
        enrolledCourseCount,
        currentMonthEnrolled,
        certificatesEarned,
        currentMonthCertificatesEarned,
        avgProgress,
        percentageIncrease,
        completedCourse
    }
}

export const dashboardDataServices = {
    getStudentDashboardData
}
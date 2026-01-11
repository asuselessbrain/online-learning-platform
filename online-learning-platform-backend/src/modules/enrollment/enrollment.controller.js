import { enrollmentService } from './enrollment.services.js';

const enrollInCourse = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'UserId and courseId are required'
            });
        }
        const result = await enrollmentService.enrollInCourse(userId, courseId);
        res.status(201).json({
            success: true,
            message: 'Enrolled successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to enroll'
        });
    }
};


const getMyEnrollments = async (req, res) => {
    try {
        const { studentEmail } = req.query;
        if (!studentEmail) {
            return res.status(400).json({
                success: false,
                message: 'studentEmail is required'
            });
        }
        const result = await enrollmentService.getEnrollmentsByStudent(studentEmail);
        res.status(200).json({
            success: true,
            message: 'Enrollments fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch enrollments'
        });
    }
};

const getCourseEnrollments = async (req, res) => {
    try {
        const { courseId } = req.params;
        const result = await enrollmentService.getStudentsByCourse(courseId);
        res.status(200).json({
            success: true,
            message: 'Course enrollments fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch course enrollments'
        });
    }
};

const updateEnrollment = async (req, res) => {
    try {
        const { studentEmail, courseId } = req.params;
        const { status, progress } = req.body;
        const result = await enrollmentService.updateEnrollmentStatus(studentEmail, courseId, status, progress);
        res.status(200).json({
            success: true,
            message: 'Enrollment updated successfully',
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Failed to update enrollment'
        });
    }
};

const getEnrollmentStatus = async (req, res) => {
    try {
        const { studentEmail, courseId } = req.params;
        const result = await enrollmentService.getEnrollmentStatus(studentEmail, courseId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Enrollment status fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch enrollment status'
        });
    }
};

const getMonthlyEnrollmentStats = async (req, res) => {
    try {
        const months = parseInt(req.query.months) || 12;
        const result = await enrollmentService.getMonthlyEnrollmentStats(months);
        res.status(200).json({
            success: true,
            message: 'Monthly enrollment statistics fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch monthly enrollment statistics'
        });
    }
};

const getEnrollmentStats = async (req, res) => {
    try {
        const result = await enrollmentService.getEnrollmentStats();
        res.status(200).json({
            success: true,
            message: 'Enrollment statistics fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch enrollment statistics'
        });
    }
};

const isEnrolled = async (req, res) => {
    const { courseId, userId } = req.params

    try {
        const isUserEnrolled = await enrollmentService.isEnrolled(courseId, userId)

        res.status(200).json({
            success: true,
            message: 'Is user already enrolled fetched',
            data: isUserEnrolled
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch enrollment'
        });
    }
}

export const enrollmentController = {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
    updateEnrollment,
    getEnrollmentStatus,
    getMonthlyEnrollmentStats,
    getEnrollmentStats,
    isEnrolled
};
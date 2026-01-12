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
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch enrollment'
        });
    }
}

const enrolledCourses = async (req, res) => {
    const { userId } = req.params

    try {
        const enrolledCourses = await enrollmentService.getMyEnrolledCourses(userId, req.query)

        res.status(200).json({
            success: true,
            message: 'Enrolled course fetch successfully',
            data: enrolledCourses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch enrolled course'
        });
    }
}

const getSingleEnrolledCourse = async (req, res) => {
    const { userId, courseId } = req.params;

    try {
        const result = await enrollmentService.getSingleCourse(userId, courseId)

        res.status(200).json({
            success: true,
            message: 'Single course fetched',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch single enrolled course'
        });
    }
}

const getSingleEnrollment = async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await enrollmentService.getSingleEnrollmentByCourse(courseId)

        res.status(200).json({
            success: true,
            message: 'Single enrollment fetched',
            data: result
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch single enrollment'
        });
    }
}

const addCompletedLesson = async (req, res) => {
    const { enrollmentId, lectureId, courseId } = req.params;

    try {
        const result = await enrollmentService.addCompletedLesson(enrollmentId, lectureId, courseId)

        res.status(200).json({
            success: true,
            message: 'Lecture added to completed lecture',
            data: result
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to add to completed lecture'
        });
    }
}
export const enrollmentController = {
    enrollInCourse,
    isEnrolled,
    enrolledCourses,
    getSingleEnrolledCourse,
    getSingleEnrollment,
    addCompletedLesson
};
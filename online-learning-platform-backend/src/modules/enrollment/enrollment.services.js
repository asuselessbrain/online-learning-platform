import { Enrollment } from './enrollment.model.js';
import { Course } from '../course/course.model.js';

const enrollInCourse = async (studentEmail, courseId) => {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error('Course not found');
    }

    // Check if student is trying to enroll in their own course
    if (course.instructorEmail === studentEmail) {
        throw new Error('You cannot enroll in your own course');
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ studentEmail, courseId });
    if (existingEnrollment) {
        throw new Error('Already enrolled in this course');
    }

    const enrollment = await Enrollment.create({ studentEmail, courseId });
    return enrollment;
};

const unenrollFromCourse = async (studentEmail, courseId) => {
    const enrollment = await Enrollment.findOneAndDelete({ studentEmail, courseId });
    if (!enrollment) {
        throw new Error('Enrollment not found');
    }
    return enrollment;
};

const getEnrollmentsByStudent = async (studentEmail) => {
    const enrollments = await Enrollment.find({ studentEmail }).populate('courseId');
    return enrollments;
};

const getStudentsByCourse = async (courseId) => {
    const enrollments = await Enrollment.find({ courseId }).populate('studentEmail'); // Note: studentEmail is string, so populate won't work directly
    return enrollments;
};

const updateEnrollmentStatus = async (studentEmail, courseId, status, progress) => {
    const updateData = { status };
    if (progress !== undefined) updateData.progress = progress;

    const enrollment = await Enrollment.findOneAndUpdate(
        { studentEmail, courseId },
        updateData,
        { new: true }
    ).populate('courseId');

    if (!enrollment) {
        throw new Error('Enrollment not found');
    }
    return enrollment;
};

const getEnrollmentStatus = async (studentEmail, courseId) => {
    const enrollment = await Enrollment.findOne({ studentEmail, courseId }).populate('courseId');
    return enrollment;
};

const getMonthlyEnrollmentStats = async (months = 12) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const stats = await Enrollment.aggregate([
        {
            $match: {
                enrolledAt: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$enrolledAt' },
                    month: { $month: '$enrolledAt' }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { '_id.year': 1, '_id.month': 1 }
        }
    ]);

    // Convert to the format expected by the frontend
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return stats.map(stat => ({
        month: monthNames[stat._id.month - 1] + ' ' + stat._id.year.toString().slice(-2),
        value: stat.count
    }));
};

const getEnrollmentStats = async () => {
    try {
        const totalEnrollments = await Enrollment.countDocuments();
        const activeEnrollments = await Enrollment.countDocuments({ status: 'enrolled' });
        const completedEnrollments = await Enrollment.countDocuments({ status: 'completed' });

        return {
            total: totalEnrollments,
            active: activeEnrollments,
            completed: completedEnrollments
        };
    } catch (error) {
        console.error('Error in getEnrollmentStats:', error);
        throw error;
    }
};

export const enrollmentService = {
    enrollInCourse,
    unenrollFromCourse,
    getEnrollmentsByStudent,
    getStudentsByCourse,
    updateEnrollmentStatus,
    getEnrollmentStatus,
    getMonthlyEnrollmentStats,
    getEnrollmentStats,
};
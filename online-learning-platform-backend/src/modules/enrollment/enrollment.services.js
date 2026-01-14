import mongoose from 'mongoose';
import { NewCourse } from '../course/course.model.js';
import { Enrollment } from './enrollment.model.js';
import AppError from '../../middleWares/appError.js';

const enrollInCourse = async (userId, courseId) => {
    const course = await NewCourse.findById(courseId);
    if (!course) {
        throw new AppError(404, 'Course not found');
    }

    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
        throw new AppError(409, 'Already enrolled in this course');
    }

    const enrollment = await Enrollment.create({ userId, courseId });
    return enrollment;
};

const isEnrolled = async (courseId, userId) => {
    const userIsEnrolled = await Enrollment.findOne({ courseId, userId })
    return !!userIsEnrolled
}

const getMyEnrolledCourses = async (userId, queryOptions) => {

    const pipeline = [
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "newcourses",
                localField: "courseId",
                foreignField: "_id",
                as: "course"
            }
        },
        { $unwind: "$course" },
        {
            $lookup: {
                from: "modules",
                localField: "course.modules",
                foreignField: "_id",
                as: "modules"
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "course.categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" },
        {
            $lookup: {
                from: "instructors",
                localField: "course.instructorId",
                foreignField: "_id",
                as: "instructor"
            }
        },
        { $unwind: "$instructor" },
        {
            $lookup: {
                from: "users",
                localField: "instructor.userId",
                foreignField: "_id",
                as: "instructorUser"
            }
        },
        {
            $unwind: "$instructorUser"
        },
        {
            $addFields: {
                "instructor.name": "$instructorUser.name",
                "instructor.email": "$instructorUser.email"
            }
        },
    ]

    if (queryOptions.searchTerm) {
        pipeline.push({
            $match: {
                $or: [
                    { "course.title": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "category.name": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "course.level": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "course.language": { $regex: queryOptions.searchTerm, $options: "i" } },
                ]
            }
        })
    }

    const sortOption = {}

    if (queryOptions.sortBy && queryOptions.sortOrder) {
        sortOption[queryOptions.sortBy] = queryOptions.sortOrder.toLowerCase() === 'asc' ? 1 : -1;
        pipeline.push({ $sort: sortOption });
    }

    if (queryOptions.category) {
        pipeline.push({
            $match: {
                "category.slug": queryOptions.category
            }
        })
    }

    if (queryOptions.level) {
        pipeline.push({
            $match: {
                "course.level": queryOptions.level
            }
        })
    }

    if (queryOptions.isFree) {
        pipeline.push({
            $match: {
                "course.isFree": queryOptions.isFree === 'true'
            }
        })
    }

    if (queryOptions.status) {
        pipeline.push({
            $match: {
                status: queryOptions.status
            }
        })
    }

    if (queryOptions.paymentStatus) {
        pipeline.push({
            $match: {
                paymentStatus: queryOptions.paymentStatus
            }
        })
    }

    const page = parseInt(queryOptions.page) || 1;

    const limit = parseInt(queryOptions.limit) || 10;

    const skip = ((parseInt(queryOptions.page) || 1) - 1) * (parseInt(queryOptions.limit) || 10);

    const enrolledCourses = await Enrollment.aggregate(pipeline).skip(skip).limit(limit)

    const totalAgg = await Enrollment.aggregate([
        ...pipeline,
        { $count: "total" }
    ]);

    const total = totalAgg[0]?.total
    return {
        meta: {
            total,
            page,
            limit
        },
        data: enrolledCourses
    }
}

const getSingleCourse = async (userId, courseId) => {

    const isCourseEnrolled = await Enrollment.findOne({ userId: new mongoose.Types.ObjectId(userId), courseId: new mongoose.Types.ObjectId(courseId) })

    if (!isCourseEnrolled) {
        throw new AppError(403, "Course is not enrolled")
    }

    const enrolledCourse = await NewCourse.findOne({ _id: courseId }).populate({
        path: "modules",
        populate: {
            path: "lectures"
        }
    }).populate({
        path: 'instructorId',
        populate: {
            path: "userId"
        }
    })
    return enrolledCourse
}

const getSingleEnrollmentByCourse = async (courseId) => {
    return await Enrollment.findOne({ courseId: new mongoose.Types.ObjectId(courseId) })
}

const addCompletedLesson = async (enrollmentId, lectureId, courseId) => {
    const course = await NewCourse.findById(courseId).populate("modules");


    const totalLectures = course.modules.reduce(
        (sum, module) => sum + module.lectures.length,
        0
    );

    const completedLesson = await Enrollment.findOneAndUpdate({
        _id: enrollmentId, completedLectures: { $ne: lectureId }
    },
        {
            $push: { completedLectures: lectureId }
        }, { new: true })

    const progress = (completedLesson.completedLectures.length / totalLectures) * 100

    return await Enrollment.findByIdAndUpdate(enrollmentId, { $set: { progressPercentage: progress } }, { new: true })
}

export const enrollmentService = {
    enrollInCourse,
    isEnrolled,
    getMyEnrolledCourses,
    getSingleCourse,
    getSingleEnrollmentByCourse,
    addCompletedLesson
};
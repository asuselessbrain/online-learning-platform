import { InstructorModel } from '../instructor/instructor.model.js';
import { NewCourse } from './course.model.js';

const createCourse = async (payload) => {
    const discountedPrice = parseFloat(payload.price) - (parseFloat(payload.price) * (parseFloat(payload.discount) / 100));

    const created = await NewCourse.create({ ...payload, discountedPrice });

    if (created._id) {
        await InstructorModel.findByIdAndUpdate({
            _id: payload.instructorId,
        },
            {
                $push: { courses: created._id }
            },
            {
                new: true
            }
        )
    }

    return created;
};

const getAllCourses = async (queryOptions) => {

    const pipeline = [
        {
            $lookup: {
                from: "instructors",
                localField: "instructorId",
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
        {
            $project: {
                instructorUser: 0
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        { $unwind: "$category" },
    ];

    if (queryOptions.searchTerm) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "instructor.name": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "category.name": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "level": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "language": { $regex: queryOptions.searchTerm, $options: "i" } },
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
                level: queryOptions.level
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

    if (queryOptions.isFree) {
        pipeline.push({
            $match: {
                isFree: queryOptions.isFree === 'true'
            }
        })
    }

    const page = parseInt(queryOptions.page) || 1;

    const limit = parseInt(queryOptions.limit) || 10;

    const skip = ((parseInt(queryOptions.page) || 1) - 1) * (parseInt(queryOptions.limit) || 10);

    const courses = await NewCourse.aggregate(pipeline).skip(skip).limit(limit);

    const totalAgg = await NewCourse.aggregate([
        ...pipeline,
        { $count: "total" }
    ]);

    const total = totalAgg[0]?.total

    return {
        courses,
        meta: {
            total,
            page,
            limit,
        },
    };
}

const getSingleCourse = async (id) => {
    const course = await NewCourse.findById(id).populate({
        path: 'instructorId',
        populate: {
            path: 'userId',
            select: 'name email'
        }
    }).populate('categoryId');

    return course
}

// const myAddedCourses = async (opts = {}) => {
//     const {
//         q,
//         instructorEmail
//     } = opts;

//     const filter = {
//         instructorEmail: instructorEmail
//     };

//     if (q) {
//         const regex = new RegExp(q.toString().trim(), 'i');
//         filter.$or = [
//             { title: { $regex: regex } },
//             { shortDescription: { $regex: regex } },
//             { category: { $regex: regex } },
//         ];
//     }

//     const courses = await Course.find(filter);
//     return courses;
// }

// const deleteCourse = async (id) => {
//     const course = await Course.findById(id);
//     if (!course) return null;

//     const deleted = await Course.findByIdAndDelete(id);

//     return deleted;
// }

const updateCourse = async (id, payload) => {

    payload.discountedPrice = parseFloat(payload.price) - (parseFloat(payload.price) * (parseFloat(payload.discount) / 100));

    const updated = await NewCourse.findByIdAndUpdate(id, payload, { new: true });
    return updated;
}

// const getCourseById = async (id) => {

//     const course = await Course.findById(id);
//     return course
// }

export const courseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    // myAddedCourses,
    // getCourseById,
    // deleteCourse,
    updateCourse
};
import mongoose from "mongoose";
import { UserModel } from "../user/user.model.js";
import { InstructorModel } from "./instructor.model.js";
import { ObjectId } from "mongodb";

const createInstructor = async (instructorData) => {
    const newInstructor = new InstructorModel(instructorData);
    await UserModel.findOne({ _id: instructorData.userId });

    await UserModel.updateOne(
        { _id: instructorData.userId },
        { $set: { role: 'instructor' } }
    );

    return await newInstructor.save();
}

const getAllInstructors = async (queryOptions) => {
    const matchStage = {};

    if (queryOptions.status) {
        matchStage.status = queryOptions.status;
    }

    if (queryOptions.verified) {
        matchStage.verified = queryOptions.verified === 'true';
    }

    if (queryOptions.minRating) {
        matchStage.rating = { $gte: Number(queryOptions.minRating) };
    }

    if (queryOptions.expertise) {
        {
            const expertiseArray = queryOptions.expertise
                .split(",")
                .map(item => item.trim());

            matchStage.expertise = { $in: expertiseArray };
        }
    }

    const pipeline = [
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },

        {
            $lookup: {
                from: "courses",
                localField: "courses",
                foreignField: "_id",
                as: "courses"
            }
        },
        { $match: matchStage },
    ];

    if (queryOptions.searchTerm) {
        pipeline.push({
            $match: {
                $or: [
                    { "user.name": { $regex: queryOptions.searchTerm, $options: "i" } },
                    { "courses.title": { $regex: queryOptions.searchTerm, $options: "i" } }
                ]
            }
        });
    }

    const sortOptions = {}

    if (queryOptions.sortOrder && queryOptions.sortBy) {
        const sortField = queryOptions.sortBy;
        const sortDirection = queryOptions.sortOrder.toLowerCase() === 'asc' ? 1 : -1;
        sortOptions[sortField] = sortDirection;
        pipeline.push({ $sort: sortOptions });
    }

    const limit = parseInt(queryOptions.limit) || 10;
    const skip = ((parseInt(queryOptions.page) || 1) - 1) * limit;

    pipeline.push({ $skip: skip }, { $limit: limit });

    const instructors = await InstructorModel.aggregate(pipeline);

    const total = await InstructorModel.countDocuments(matchStage);

    return {
        meta: {
            total: total,
            limit: limit,
            page: parseInt(queryOptions.page) || 1,
        },
        data: instructors
    }
}

const getSingleInstructor = async (id) => {
    const pipeline = [
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        { $unwind: "$user" },
        {
            $lookup: {
                from: "courses",
                localField: "courses",
                foreignField: "_id",
                as: "courses"
            }
        },
        { $limit: 1 }
    ]
    const result = await InstructorModel.aggregate(pipeline)
    return result[0];
}

const suspendInstructor = async (id) => {
    const result = await InstructorModel.findByIdAndUpdate(id, { status: 'suspended' }, { new: true });
    return result;
}

const getInstructorCountForAdmin = async () => {
    const totalInstructors = await InstructorModel.countDocuments();
    const activeInstructors = await InstructorModel.countDocuments({ status: 'active' });
    const pendingInstructors = await InstructorModel.countDocuments({ status: 'pending' });
    const suspendedInstructors = await InstructorModel.countDocuments({ status: 'suspended' });

    const pipeline = [
        {
            $group: {
                _id: null,
                averageRating: { $avg: "$rating" },
            }
        }
    ]
    const overAllReviews = await InstructorModel.aggregate(pipeline)

    return {
        totalInstructors,
        activeInstructors,
        pendingInstructors,
        suspendedInstructors,
        overAllReviews: overAllReviews[0]?.averageRating
    }
}

const getActiveInstructors = async () => {
    const pipeline = [
        { $match: { status: 'active' } },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        }
    ]
    const result = await InstructorModel.aggregate(pipeline);
    return {
        meta: {
            total: 10,
            limit: 10,
            page: 1
        },
        data: result
    };
}
export const InstructorService = {
    createInstructor,
    getAllInstructors,
    getSingleInstructor,
    suspendInstructor,
    getInstructorCountForAdmin,
    getActiveInstructors
};
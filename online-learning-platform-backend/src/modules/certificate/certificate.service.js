import { Enrollment } from "../enrollment/enrollment.model.js"
import { certificate } from "./certificate.model.js"

const createCertificate = async (payload) => {
    payload.certificateId = `EduLe-${new Date().getFullYear()}-${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`

    await Enrollment.findOneAndUpdate({ userId: payload.studentId, courseId: payload.courseId }, { completed: true })
    return await certificate.create(payload)
}

const getSingleUserCertificates = async (userId, queryOptions) => {

    const filter = { studentId: userId }

    if (queryOptions.searchTerm) {
        filter.$or = [
            { courseName: { $regex: new RegExp(queryOptions.searchTerm, 'i') } },
            { certificateId: { $regex: new RegExp(queryOptions.searchTerm, 'i') } },
        ]
    }

    if (queryOptions.status) {
        filter.status = queryOptions.status
    }

    const sort = {}

    if (queryOptions.sortOrder && queryOptions.sortBy) {
        sort[queryOptions.sortBy] = queryOptions.sortOrder === 'asc' ? 1 : -1
    }

    const limit = parseInt(queryOptions.limit) || 10;
    const page = parseInt(queryOptions.page) || 1;
    const skip = (page - 1) * limit;

    const result = await certificate.find(filter).sort(sort).limit(limit).skip(skip)
    const total = await certificate.countDocuments(filter)
    return {
        meta: {
            total,
            limit,
            page
        },
        data: result
    }
}

export const certificateService = {
    createCertificate,
    getSingleUserCertificates
}
import { Course } from './course.model.js';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

const createCourse = async (payload) => {
    const created = await Course.create(payload);
    return created;
};

const getAllCourses = async (opts = {}) => {
    const {
        q,
        category,
        level,
        minPrice,
        maxPrice,
        sortBy = 'createdAt',
        sortDir = 'desc',
        page,
        limit,
    } = opts;

    const filter = {};

    if (q) {
        const regex = new RegExp(q.toString().trim(), 'i');
        filter.$or = [
            { title: { $regex: regex } },
            { shortDescription: { $regex: regex } },
            { category: { $regex: regex } },
        ];
    }

    if (category) filter.category = category;
    if (level) filter.level = level;

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) {
            const n = Number(minPrice);
            if (!Number.isNaN(n)) filter.price.$gte = n;
        }
        if (maxPrice !== undefined) {
            const n = Number(maxPrice);
            if (!Number.isNaN(n)) filter.price.$lte = n;
        }
        if (Object.keys(filter.price).length === 0) delete filter.price;
    }

    const allowedSort = ['createdAt'];
    const sortField = allowedSort.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = sortDir === 'asc' ? 1 : -1;
    const sortObj = { [sortField]: sortOrder };

    let skip = 0;
    let lim = 10;
    const pageNum = page ? parseInt(page, 10) : undefined;
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    if (!Number.isNaN(pageNum) && pageNum > 0 && !Number.isNaN(limitNum) && limitNum > 0) {
        lim = limitNum;
        skip = (pageNum - 1) * lim;
    } else if (!Number.isNaN(limitNum) && limitNum > 0) {
        lim = limitNum;
    }

    const total = await Course.countDocuments(filter);

    let query = Course.find(filter).sort(sortObj);
    if (lim > 0) query = query.skip(skip).limit(lim);

    const courses = await query.exec();

    return {
        courses,
        meta: {
            total,
            page: pageNum || 1,
            limit: lim || total,
        },
    };
}

const myAddedCourses = async (opts = {}) => {
    const {
        q,
        instructorEmail
    } = opts;

    const filter = {
        instructorEmail: instructorEmail
    };

    if (q) {
        const regex = new RegExp(q.toString().trim(), 'i');
        filter.$or = [
            { title: { $regex: regex } },
            { shortDescription: { $regex: regex } },
            { category: { $regex: regex } },
        ];
    }

    const courses = await Course.find(filter);
    return courses;
}

const deleteCourse = async (id) => {
    const course = await Course.findById(id);
    if (!course) return null;

    const deleted = await Course.findByIdAndDelete(id);

    return deleted;
}

const updateCourse = async (id, payload) => {
    const course = await Course.findById(id);
    if (!course) return null;

    const updated = await Course.findByIdAndUpdate(id, payload, { new: true });
    return updated;
}

const getCourseById = async (id) => {
    
    const course = await Course.findById(id);
    return course
}

export const courseService = {
    createCourse,
    getAllCourses,
    myAddedCourses,
    getCourseById,
    deleteCourse,
    updateCourse
};
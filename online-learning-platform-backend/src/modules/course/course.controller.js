import { courseService } from "./course.services.js";
import { reviewService } from "../review/review.services.js";

const createCourse = async (req, res) => {
    try {
        const result = await courseService.createCourse(req.body);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to create course"
        });
    }
}

const getAllCourses = async (req, res) => {
    try {
        const result = await courseService.getAllCourses(req.query || {});
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: result.courses,
            meta: result.meta
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch courses"
        });
    }
}

const getCourseById = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const course = await courseService.getSingleCourse(id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.status(200).json({ success: true, message: 'Course fetched', data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Failed to fetch course' });
    }
}

// const deleteCourse = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deleted = await courseService.deleteCourse(id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, message: 'Course not found' });
//         }
//         res.status(200).json({ success: true, message: 'Course deleted', data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message || 'Failed to delete course' });
//     }
// }

const updateCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await courseService.updateCourse(id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.status(200).json({ success: true, message: 'Course updated successfully', data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Failed to update course' });
    }
}

const getAllCoursesForUser = async (req, res) => {
    try {
        const result = await courseService.getAllCoursesForUser(req.query || {});
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch courses"
        });
    }
}

export const courseController = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    getAllCoursesForUser,
    // deleteCourse,
    // myAddedCourses
};
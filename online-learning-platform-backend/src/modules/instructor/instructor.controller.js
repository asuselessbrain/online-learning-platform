import { InstructorService } from "./instructor.service.js";

const createInstructor = async (req, res) => {
    try {
        const instructorData = req.body;
        const newInstructor = await InstructorService.createInstructor(instructorData);
        res.status(201).json({
            success: true,
            message: "Instructor created successfully",
            data: newInstructor,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create instructor",
            error: error
        });
    }
}

const getAllInstructors = async (req, res) => {
    try {
        const queryOptions = req.query;
        const instructors = await InstructorService.getAllInstructors(queryOptions);
        res.status(200).json({
            success: true,
            message: "Instructors retrieved successfully",
            data: instructors,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructors",
            error: error
        });
    }
}

const getSingleInstructor = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await InstructorService.getSingleInstructor(id)
        res.status(200).json({
            success: true,
            message: "Instructor retrieved successfully",
            data: result,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructors",
            error: error
        });
    }
}

const suspendInstructor = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await InstructorService.suspendInstructor(id)
        res.status(200).json({
            success: true,
            message: "Instructor suspended successfully",
            data: result,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to suspend instructor",
            error: error
        });
    }
}

const getInstructorCountForAdmin = async (req, res) => {
    try {
        const counts = await InstructorService.getInstructorCountForAdmin();
        res.status(200).json({
            success: true,
            message: "Instructor counts retrieved successfully",
            data: counts,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor counts",
            error: error
        });
    }
}

const getActiveInstructors = async (req, res) => {
    try {
        const result = await InstructorService.getActiveInstructors();
        res.status(200).json({
            success: true,
            message: "Active instructors retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve active instructors",
            error: error
        });
    }
}

export const InstructorController = {
    createInstructor,
    getAllInstructors,
    getSingleInstructor,
    suspendInstructor,
    getInstructorCountForAdmin,
    getActiveInstructors
};
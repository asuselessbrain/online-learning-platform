import { LectureService } from "./lectures.service.js";

const createLecture = async (req, res) => {
    try {
        const lectureData = req.body;
        const newLecture = await LectureService.createLecture(lectureData);
        res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            data: newLecture,
        });
    } catch (error) {
        console.log(error)
        res.status(error.status || error.statusCode || 500).json({
            success: false,
            message: "Failed to create lecture",
            error: error
        });
    }
}

export const LectureController = {
    createLecture
}
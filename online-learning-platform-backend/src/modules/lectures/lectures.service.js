import { InstructorModel } from "../instructor/instructor.model.js";
import { ModuleModel } from "../module/module.model.js";
import { Lecture } from "./lectures.model.js";

const createLecture = async (lectureData) => {
    const module = await ModuleModel.findById(lectureData.moduleId);


    const instructor = await InstructorModel.findOne({ userId: lectureData.userId })

    if (!module) {
        throw new Error("Module is not exist")
    }

    lectureData.instructorId = instructor._id

    const lecture = await Lecture.create(lectureData)


    const updatedModule = await ModuleModel.findByIdAndUpdate({ _id: module._id }, { $push: { lectures: lecture._id } }, { new: true })

    return updatedModule
}

export const LectureService = {
    createLecture
}
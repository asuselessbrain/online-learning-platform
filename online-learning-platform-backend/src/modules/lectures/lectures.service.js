import { InstructorModel } from "../instructor/instructor.model.js";
import { ModuleModel } from "../module/module.model.js";
import { Lecture } from "./lectures.model.js";

const createLecture = async (lectureData) => {
    const module = await ModuleModel.findById(lectureData.moduleId);

    lectureData.type === "video" ? lectureData.videoUrl = lectureData.secureUrl : lectureData.type === "document" ? lectureData.documentUrl = lectureData.secureUrl : lectureData.content

    console.log(lectureData.secureUrl)

    if (!module) {
        throw new Error("Module is not exist")
    }

    console.log(lectureData)

    const lecture = await Lecture.create(lectureData)

    const duration = lectureData.duration


    const updatedModule = await ModuleModel.findByIdAndUpdate({ _id: module._id }, { $push: { lectures: lecture._id }, $inc: { duration } }, { new: true })

    return updatedModule
}

export const LectureService = {
    createLecture
}
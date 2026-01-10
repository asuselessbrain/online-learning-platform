import { NewCourse } from "../course/course.model.js"
import { InstructorModel } from "../instructor/instructor.model.js";
import { ModuleModel } from "./module.model.js";

const createModule = async (moduleData) => {
    const course = await NewCourse.findById(moduleData.courseId);

    const instructorId = await InstructorModel.find({userId: moduleData.userId})

    if (!course) {
        throw new Error("Course is not exist")
    }

    moduleData.instructorId = instructorId._id

    const module = await ModuleModel.create(moduleData)


    const updatedCourse = await NewCourse.findByIdAndUpdate({ _id: course._id }, { $push: { modules: module._id } }, { new: true })

    return updatedCourse
}

export const ModuleService = {
    createModule
}
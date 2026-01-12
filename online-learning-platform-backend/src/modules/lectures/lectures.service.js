import { NewCourse } from "../course/course.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";
import { ModuleModel } from "../module/module.model.js";
import { Lecture } from "./lectures.model.js";

const createLecture = async (lectureData) => {
    const module = await ModuleModel.findById(lectureData.moduleId);

    lectureData.type === "video" ? lectureData.videoUrl = lectureData.secureUrl : lectureData.type === "document" ? lectureData.documentUrl = lectureData.secureUrl : lectureData.content


    if (!module) {
        throw new Error("Module is not exist")
    }

    const lecture = await Lecture.create(lectureData)

    const duration = lectureData.duration

    await ModuleModel.findByIdAndUpdate({ _id: module._id }, { $push: { lectures: lecture._id }, $inc: { duration } }, { new: true })

    const course = await NewCourse.findById(lectureData.courseId).populate("modules");

    const totalLectures = course.modules.reduce(
        (sum, module) => sum + (module.lectures?.length || 0),
        0
    );

    const enrollments = await Enrollment.find({ courseId: lectureData.courseId })

    for (const enrollment of enrollments) {
        const progress =
            totalLectures === 0
                ? 0
                : (enrollment.completedLectures.length / totalLectures) * 100;

        await Enrollment.findByIdAndUpdate(
            enrollment._id,
            { $set: { progressPercentage: progress } }
        );
    }


    return lecture
}

export const LectureService = {
    createLecture
}
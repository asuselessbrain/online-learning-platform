import express from "express";
import { courseController } from "./course.controller.js";

const router = express.Router();

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourse);
router.get("/user/courses", courseController.getAllCoursesForUser);
// router.delete("/courses/:id", courseController.deleteCourse);

export const newCourseRouter = router;
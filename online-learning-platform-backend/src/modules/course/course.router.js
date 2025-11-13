import express from "express";
import { courseController } from "./course.controller.js";

const router = express.Router();

router.post("/courses", courseController.createCourse);
router.get("/courses", courseController.getAllCourses);
router.get("/my-added-courses", courseController.myAddedCourses);
router.get("/courses/:id", courseController.getCourseById);
router.put("/courses/:id", courseController.updateCourse);
router.delete("/courses/:id", courseController.deleteCourse);

export const courseRouter = router;
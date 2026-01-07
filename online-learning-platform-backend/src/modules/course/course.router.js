import express from "express";
import { courseController } from "./course.controller.js";

const router = express.Router();

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
// router.put("/courses/:id", courseController.updateCourse);
// router.delete("/courses/:id", courseController.deleteCourse);

export const newCourseRouter = router;
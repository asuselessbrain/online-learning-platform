import express from "express";
import cors from "cors";
import { enrollmentRouter } from "./modules/enrollment/enrollment.router.js";
import { reviewRouter } from "./modules/review/review.router.js";
import { UserRoutes } from "./modules/user/user.route.js";
import { faqRouter } from "./modules/faq/faq.router.js";
import { categoryRouter } from "./modules/category/category.router.js";
import { InstructorRouter } from "./modules/instructor/instructor.router.js";
import { courseRouter } from "./modules/courses/course.router.js";
import { newCourseRouter } from "./modules/course/course.router.js";
import { blogsRouter } from "./modules/blogs/blogs.router.js";
import { moduleRouter } from "./modules/module/module.router.js";
import { lectureRouter } from "./modules/lectures/lectures.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", courseRouter)
app.use("/api/v1/new-courses", newCourseRouter)
app.use("/api/v1", enrollmentRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/users", UserRoutes)
app.use("/api/v1/faqs", faqRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/instructors", InstructorRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/modules", moduleRouter)
app.use("/api/v1/lectures", lectureRouter)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;

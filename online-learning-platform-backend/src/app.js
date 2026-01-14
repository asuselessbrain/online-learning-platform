import express from "express";
import cors from "cors";
import { enrollmentRouter } from "./modules/enrollment/enrollment.router.js";
import { reviewRouter } from "./modules/review/review.router.js";
import { UserRoutes } from "./modules/user/user.route.js";
import { faqRouter } from "./modules/faq/faq.router.js";
import { categoryRouter } from "./modules/category/category.router.js";
import { InstructorRouter } from "./modules/instructor/instructor.router.js";
import { newCourseRouter } from "./modules/course/course.router.js";
import { blogsRouter } from "./modules/blogs/blogs.router.js";
import { moduleRouter } from "./modules/module/module.router.js";
import { lectureRouter } from "./modules/lectures/lectures.router.js";
import notFound from "./middleWares/notFound.js";
import router from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use(notFound)

export default app;

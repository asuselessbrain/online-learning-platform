import express from "express";
import cors from "cors";
import { courseRouter } from "./modules/course/course.router.js";
import { enrollmentRouter } from "./modules/enrollment/enrollment.router.js";
import { reviewRouter } from "./modules/review/review.router.js";
import { UserRoutes } from "./modules/user/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", courseRouter)
app.use("/api/v1", enrollmentRouter)
app.use("/api/v1/reviews", reviewRouter)
app.use("/api/v1/users", UserRoutes)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;

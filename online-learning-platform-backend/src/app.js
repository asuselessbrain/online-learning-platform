import express from "express";
import cors from "cors";
import { courseRouter } from "./modules/course/course.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", courseRouter)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

export default app;

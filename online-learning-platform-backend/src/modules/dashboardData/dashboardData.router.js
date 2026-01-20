import express from "express";
import { dashboardDataController } from "./dashboardData.controller.js";

const router = express.Router();

router.get("/student/:userId", dashboardDataController.getStudentDashboardData);

export const dashboardDataRouter = router;
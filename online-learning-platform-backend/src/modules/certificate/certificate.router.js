import express from "express"
import { certificateController } from "./certificate.controller.js";

const router = express.Router()

router.post('/', certificateController.createCertificate)

export const certificateRouter = router;
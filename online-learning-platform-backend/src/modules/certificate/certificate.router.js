import express from "express"
import { certificateController } from "./certificate.controller.js";

const router = express.Router()

router.post('/', certificateController.createCertificate)
router.get('/:userId', certificateController.getSingleUserCertificate)

export const certificateRouter = router;
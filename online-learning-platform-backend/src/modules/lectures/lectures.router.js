import express from 'express'
import { LectureController } from './lectures.controller.js'

const router = express.Router()

router.post("/", LectureController.createLecture)

export const lectureRouter = router
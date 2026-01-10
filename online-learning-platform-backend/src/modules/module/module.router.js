import express from 'express'
import { ModuleController } from './module.controller.js'

const router = express.Router()

router.post("/", ModuleController.createModule)

export const moduleRouter = router
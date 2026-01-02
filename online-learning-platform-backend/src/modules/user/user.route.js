import express from 'express';
import { UserController } from './user.controller.js';

const router = express.Router();

router.post('/', UserController.createUserInDB)

export const UserRoutes = router;
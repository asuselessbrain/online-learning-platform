import express from 'express';
import { UserController } from './user.controller.js';

const router = express.Router();

router.post('/', UserController.createUserInDB)
router.get('/:email/role', UserController.getUserRole)
router.get('/', UserController.getAllUsers)
router.get('/:email/profile', UserController.getMyProfile)

export const UserRoutes = router;
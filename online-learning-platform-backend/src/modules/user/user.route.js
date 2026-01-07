import express from 'express';
import { UserController } from './user.controller.js';

const router = express.Router();

router.post('/', UserController.createUserInDB)
router.get('/:email/role', UserController.getUserRole)
router.get('/', UserController.getAllUsers)

export const UserRoutes = router;
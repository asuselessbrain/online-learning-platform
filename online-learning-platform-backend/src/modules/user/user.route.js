import express from 'express';
import { UserController } from './user.controller.js';

const router = express.Router();

router.post('/', UserController.createUserInDB)
router.get('/:email/role', UserController.getUserRole)

export const UserRoutes = router;
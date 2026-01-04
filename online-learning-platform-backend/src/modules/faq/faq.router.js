import express from 'express';
import { faqController } from './faq.controller.js';

const router = express.Router();

router.post('/', faqController.createFAQ);

export const faqRouter = router;
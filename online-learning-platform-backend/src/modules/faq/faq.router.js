import express from 'express';
import { faqController } from './faq.controller.js';

const router = express.Router();

router.post('/', faqController.createFAQ);
router.get('/admin', faqController.getAllFAQ);
router.get('/:id', faqController.getSingleFAQ);
router.put('/:id', faqController.updateFAQ);
router.delete('/:id', faqController.deleteFAQ);

export const faqRouter = router;
import express from 'express';
import { evaluateSegment } from './controllers/segmentController.js';

const router = express.Router();

// POST /api/segments/evaluate - Evaluate segment rules
router.post('/evaluate', evaluateSegment);

export default router;
import express from 'express'
import { createCandidature, readCandidature } from '../controller/candidature.controller.js';
import { routerStats } from '../controller/statistics.controller.js';

const router = express.Router();

router.post('/add', createCandidature);
router.get('/get', readCandidature);
router.get('/stats', routerStats);

export default router;
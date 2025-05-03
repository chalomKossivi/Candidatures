import express from 'express'
import { createCandidature, readCandidature ,deleteCandidature ,updateCandidature } from '../controller/candidature.controller.js';
import { routerStats } from '../controller/statistics.controller.js';

const router = express.Router();

router.post('/add', createCandidature);
router.get('/get', readCandidature);
router.get('/stats', routerStats);
router.delete("/:id", deleteCandidature);
router.put("/:id", updateCandidature);


export default router;
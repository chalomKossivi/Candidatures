import express from 'express'
import { createCandidature, readCandidature } from '../controller/candidature.controller.js';

const router = express.Router();

router.post('/add', createCandidature);
router.get('/get', readCandidature);

export default router;
import express from 'express'
import { createCandidature, readCandidature } from '../controller/candidature.controller'

const router = express.Router();

router.post('/add', createCandidature);
router.get('/get', readCandidature);

export default router;
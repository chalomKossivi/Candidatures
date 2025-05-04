// ---------------------------
// routes/candidature.router.js
// ---------------------------
import express from "express";
import {
  createCandidature,
  readCandidature,
  updateCandidatureStatus,
  deleteCandidature,
} from "../controller/candidature.controller.js";
import { routerStats } from "../controller/statistics.controller.js";
import axios from "axios";

const router = express.Router();

router.post("/add", createCandidature);
router.get("/get", readCandidature);
router.get("/stats", routerStats);
router.put("/updateStatus/:id", updateCandidatureStatus);
router.delete("/:id", deleteCandidature);

// Endpoint pour vérifier l'existence d'une URL (si besoin côté client)
router.post("/check-url", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.head(url, { timeout: 3000 });
    const isValid = response.status >= 200 && response.status < 400;
    res.json({ exists: isValid });
  } catch (error) {
    res.json({ exists: false });
  }
});

export default router;
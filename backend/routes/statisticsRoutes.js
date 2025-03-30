const express = require('express');
const router = express.Router();
const Candidature = require('../models/Candidature');

// Route pour récupérer les statistiques
router.get('/stats', async (req, res) => {
    try {
        const total = await Candidature.countDocuments();
        const stats = await Candidature.aggregate([
            { $group: { _id: "$statut", count: { $sum: 1 } } }
        ]);

        res.json({ total, stats });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;

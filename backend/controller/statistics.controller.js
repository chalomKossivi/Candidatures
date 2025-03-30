import Candidature from '../models/candidature.js';

// Route pour récupérer les statistiques
export const routerStats = async (req, res) => {
    try {
        const total = await Candidature.countDocuments();
        const stats = await Candidature.aggregate([
            { $group: { _id: "$statut", count: { $sum: 1 } } }
        ]);

        res.json({ total, stats });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

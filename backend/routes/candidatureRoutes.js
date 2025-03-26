const express = require("express"); // Importe Express pour gérer les routes
const Candidature = require("../models/candidature"); // Importe le modèle de candidature

const router = express.Router(); // Crée un routeur Express

// Route GET - Récupérer toutes les candidatures
router.get("/candidatures", async (req, res) => {
  try {
    const candidatures = await Candidature.find(); // Recherche toutes les candidatures
    res.status(200).json(candidatures); // Renvoie les candidatures en JSON
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des candidatures", error });
  }
});

// Route POST - Ajouter une nouvelle candidature
router.post("/candidatures", async (req, res) => {
  try {
    const nouvelleCandidature = new Candidature(req.body); // Crée une nouvelle candidature avec les données envoyées
    await nouvelleCandidature.save(); // Enregistre la candidature dans la base de données
    res.status(201).json(nouvelleCandidature); // Renvoie la candidature créée
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout de la candidature", error });
  }
});

// Route GET - Récupérer une candidature spécifique par ID
router.get("/candidatures/:id", async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id); // Recherche la candidature par ID
    if (!candidature) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    res.status(200).json(candidature); // Renvoie la candidature trouvée
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la candidature", error });
  }
});

// Route PUT - Modifier une candidature par ID
router.put("/candidatures/:id", async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Met à jour la candidature
    if (!candidature) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    res.status(200).json(candidature); // Renvoie la candidature mise à jour
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la candidature", error });
  }
});

// Route DELETE - Supprimer une candidature par ID
router.delete("/candidatures/:id", async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndDelete(req.params.id); // Supprime la candidature
    if (!candidature) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    res.status(200).json({ message: "Candidature supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la candidature", error });
  }
});

module.exports = router; // Exporte le routeur pour l'utiliser dans server.js

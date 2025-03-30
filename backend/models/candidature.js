const mongoose = require("mongoose"); // Importe mongoose pour définir le modèle

// Définition du schéma pour une candidature
const CandidatureSchema = new mongoose.Schema(
  {
    entreprise: {
      type: String,
      required: true, // Ce champ est obligatoire
      trim: true, // Supprime les espaces inutiles
    },
    poste: {
      type: String,
      required: true,
      trim: true,
    },
    lienOffre: {
      type: String,
      required: false, // Ce champ est optionnel
      trim: true,
    },
    dateEnvoi: {
      type: Date,
      required: true,
      default: Date.now, // Définit la date d'envoi par défaut à la date actuelle
    },
    statut: {
      type: String,
      required: true,
      enum: ["En attente", "Acceptée", "Refusée"], // Seuls ces statuts sont autorisés
      default: "En attente", // Par défaut, une candidature est "En attente"
    },
    dateRelance: {
      type: Date,
      required: false, // Optionnel, car on peut ne pas avoir encore relancé
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);

// Création du modèle basé sur le schéma
const Candidature = mongoose.model("Candidature", CandidatureSchema);

module.exports = Candidature; // Exporte le modèle pour pouvoir l'utiliser dans d'autres fichiers
import mongoose from 'mongoose'

const candidatureSchema = mongoose.Schema(
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
)

export default mongoose.model('candidatures', candidatureSchema)
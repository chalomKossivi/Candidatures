import Candidature from "../models/candidature.js"

export const createCandidature = async (req, res) => {
  try {   
    const { lienOffre } = req.body;
    try {
      new URL(lienOffre); // valide le lien
    } catch {
      return res.status(400).json({ message: "Lien d'offre invalide" });
    } 
    const response = await Candidature.create(req.body)
    res.status(201).json({ message: 'a été ajouté', response })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const readCandidature = async (req, res) => {
  try {
    const response = await Candidature.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCandidature = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID de projet invalide." });
    }

    const deleted = await Candidature.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Candidature non trouvée." });
    }

    res.status(200).json({ message: "Candidature supprimée avec succès." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCandidatureStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const statutsValides = ["En attente", "Accepté", "Refusé"];
    if (!statutsValides.includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const candidature = await Candidature.findByIdAndUpdate(id, { statut }, { new: true });

    if (!candidature) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }

    res.status(200).json({ message: "Statut mis à jour", candidature });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};
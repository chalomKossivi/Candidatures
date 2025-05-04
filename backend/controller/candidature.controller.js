import Candidature from "../models/candidature.js"

export const createCandidature = async (req, res) => {
  try {    
    const response = await Candidature.create(req.body)
    res.status(201).json({ message: 'a été ajouté', response })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const readCandidature = async (req, res) => {
  try {
    const response = await Candidature.find()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)

  }
}


// Supprimer une candidature par ID
export const deleteCandidature = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Candidature.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    res.status(200).json({ message: "Candidature supprimée avec succès", deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour une candidature par ID
export const updateCandidature = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Candidature.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    res.status(200).json({ message: "Candidature mise à jour avec succès", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import React, { useState } from "react";
import axios from "axios";

const AddCandidatureForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    entreprise: "",
    poste: "",
    lienOffre: "",
    dateEnvoi: "",
    statut: "En attente",
    dateRelance: "",  // Ajout de la date de relance
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/candidatures", formData);
      onAdd();
      // Réinitialisation du formulaire
      setFormData({
        entreprise: "",
        poste: "",
        lienOffre: "",
        dateEnvoi: "",
        statut: "En attente",
        dateRelance: "",
      });
      alert("Candidature ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Erreur lors de l'ajout de la candidature");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="entreprise" placeholder="Entreprise" value={formData.entreprise} onChange={handleChange} required />
      <input type="text" name="poste" placeholder="Poste" value={formData.poste} onChange={handleChange} required />
      <input type="url" name="lienOffre" placeholder="Lien de l'offre" value={formData.lienOffre} onChange={handleChange} required />
      <input type="date" name="dateEnvoi" value={formData.dateEnvoi} onChange={handleChange} required />
      <select name="statut" value={formData.statut} onChange={handleChange}>
        <option value="En attente">En attente</option>
        <option value="Accepté">Accepté</option>
        <option value="Refusé">Refusé</option>
      </select>
      
      {/* 🟢 Champ pour la date de relance */}
      <input type="date" name="dateRelance" value={formData.dateRelance} onChange={handleChange} />

      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddCandidatureForm;
  
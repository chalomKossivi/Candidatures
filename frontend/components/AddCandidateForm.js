import React, { useState } from "react";
import { addCandidature } from "../services/candidatureService";

const AddCandidatureForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    entreprise: "",
    poste: "",
    lien_de_lOffre: "",
    dateEnvoi: "",
    statut: "En cours",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCandidature(formData);
    onAdd();
    setFormData({ entreprise: "", poste: "", lien_de_lOffre: "", dateEnvoi: "", statut: "En cours" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="entreprise" placeholder="Entreprise" value={formData.entreprise} onChange={handleChange} required />
      <input type="text" name="poste" placeholder="Poste" value={formData.poste} onChange={handleChange} required />
      <input type="url" name="lien_de_lOffre" placeholder="Lien de l'offre" value={formData.lienOffre} onChange={handleChange} required />
      <input type="date" name="dateEnvoi" value={formData.dateEnvoi} onChange={handleChange} required />
      <select name="statut" value={formData.statut} onChange={handleChange}>
        <option value="En cours">En cours</option>
        <option value="Acceptée">Acceptée</option>
        <option value="Refusée">Refusée</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddCandidatureForm;

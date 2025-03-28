import { useState } from "react";
import axios from "axios";


const AddCandidatureForm = () => {
  const [formData, setFormData] = useState({
    entreprise: "",
    poste: "",
    lienOffre: "",
    dateEnvoi: "",
    statut: "En attente",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/candidatures", formData);
      alert("Candidature ajoutée avec succès !");
      setFormData({
        entreprise: "",
        poste: "",
        lienOffre: "",
        dateEnvoi: "",
        statut: "En attente",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="entreprise" placeholder="Entreprise" value={formData.entreprise} onChange={handleChange} required />
      <input type="text" name="poste" placeholder="Poste" value={formData.poste} onChange={handleChange} required />
      <input type="url" name="lienOffre" placeholder="Lien de l’offre" value={formData.lienOffre} onChange={handleChange} required />
      <input type="date" name="dateEnvoi" value={formData.dateEnvoi} onChange={handleChange} required />
      <select name="statut" value={formData.statut} onChange={handleChange}>
        <option value="En attente">En attente</option>
        <option value="Acceptée">Acceptée</option>
        <option value="Refusée">Refusée</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddCandidatureForm;

import React, { useState } from "react";
import axios from "axios";

const AddCandidatureForm = () => {
  const [formData, setFormData] = useState({
    entreprise: "",
    poste: "",
    lienOffre: "",
    dateEnvoi: "",
    statut: "En attente", // Valeur par défaut
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Vérifie que l'URL est bien formée
  const isValidUrl = (url) => {
    try {
      new URL(url); // Vérifie si c'est une vraie URL
      return true;
    } catch (_){
      return false;
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement

    //pour  Vérifier que le lien est une URL valide
    if (!isValidUrl(formData.lienOffre)) {
      alert("Le lien de l’offre n’est pas valide.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/candidatures/add", formData);
      alert(" succès d'ajout de Candidature!");
      
      //Pour Réinitialiser le formulaire
      setFormData({
        entreprise: "",
        poste: "",
        lienOffre: "",
        dateEnvoi: "",
        statut: "En attente",
      });
    }
    catch (error) {
      console.error("Erreur lors d'Ajout de Candidature:", error);
      alert("Une erreur est survenue. Veuillez réentrer vos informations.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input  type="text"  name="entreprise"   placeholder="Nom de l'entreprise"  value={formData.entreprise} onChange={handleChange} required />
      <input  type="text" name="poste"  placeholder="Poste Souhaité"  value={formData.poste} onChange={handleChange} required />

      <input  type="url" name="lienOffre"  placeholder="Lien de l'offre"    value={formData.lienOffre}  onChange={handleChange}   required />
      <input type="date" name="dateEnvoi" value={formData.dateEnvoi} onChange={handleChange}   min="2000-01-01"required />

      <select  name="statut"  value={formData.statut}   onChange={handleChange} required>
        <option value="En attente">En attente</option>
        <option value="Acceptée">Acceptée</option>
        <option value="Refusée">Refusée</option>
      </select>

      <button type="submit">Ajouter la candidature</button>
    </form>
  );
};

export default AddCandidatureForm;
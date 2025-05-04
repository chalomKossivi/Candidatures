import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

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

    const { lienOffre, dateEnvoi } = formData;

    // Vérifie le format du lien (facultatif)
    if (lienOffre && !isValidUrl(lienOffre)) {
      alert("Le lien d'offre n'est pas valide.");
      return;
    }

    // Vérifie que la date n'est pas dans le passé
    if (!isValidDate(dateEnvoi)) {
      alert("La date d'envoi ne peut pas être dans le passé.");
      return;
    }

    // Vérifie que l'URL existe (requête au serveur)
    if (lienOffre) {
      try {
        const res = await axios.post("http://localhost:8080/api/candidatures/check-url", {
          url: lienOffre,
        });
        if (!res.data.exists) {
          alert("Le lien d'offre est inaccessible ou inexistant.");
          return;
        }
      } catch (err) {
        alert("Erreur lors de la vérification du lien.");
        return;
      }
    }

    // Soumission finale
    try {
      await axios.post("http://localhost:8080/api/candidatures/add", formData);
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
      alert("Erreur lors de l'ajout de la candidature.");
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidDate = (inputDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const enteredDate = new Date(inputDate);
    return enteredDate >= today;
  };

  const todayDateStr = new Date().toISOString().split("T")[0];

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="entreprise"
          placeholder="Entreprise"
          value={formData.entreprise}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="poste"
          placeholder="Poste"
          value={formData.poste}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="lienOffre"
          placeholder="Lien de l’offre"
          value={formData.lienOffre}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateEnvoi"
          min={todayDateStr}
          value={formData.dateEnvoi}
          onChange={handleChange}
          required
        />
        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
        >
          <option value="En attente">En attente</option>
          <option value="Accepté">Accepté</option>
          <option value="Refusé">Refusé</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
};

export default AddCandidatureForm;
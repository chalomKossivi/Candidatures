import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [statuts, setStatuts] = useState(["En attente", "Accepté", "Refusé"]);
  const [selectedEntreprise, setSelectedEntreprise] = useState("");
  const [selectedStatut, setSelectedStatut] = useState("");

  useEffect(() => {
    fetchCandidatures();
  }, [selectedEntreprise, selectedStatut]); // Recharge la liste lorsqu'un filtre change

  const fetchCandidatures = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidatures");
      let data = response.data;

      // Extraction des entreprises uniques pour le filtre
      const uniqueEntreprises = [...new Set(data.map((c) => c.entreprise))];
      setEntreprises(uniqueEntreprises);

      // Filtrer en fonction des sélections
      if (selectedEntreprise) {
        data = data.filter((c) => c.entreprise === selectedEntreprise);
      }
      if (selectedStatut) {
        data = data.filter((c) => c.statut === selectedStatut);
      }

      setCandidatures(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des candidatures :", error);
    }
  };

  return (
    <div>
      <h2>Liste des Candidatures</h2>

      {/* Filtres */}
      <div>
        <label>Filtrer par entreprise :</label>
        <select onChange={(e) => setSelectedEntreprise(e.target.value)} value={selectedEntreprise}>
          <option value="">Toutes</option>
          {entreprises.map((entreprise, index) => (
            <option key={index} value={entreprise}>
              {entreprise}
            </option>
          ))}
        </select>

        <label>Filtrer par statut :</label>
        <select onChange={(e) => setSelectedStatut(e.target.value)} value={selectedStatut}>
          <option value="">Tous</option>
          {statuts.map((statut, index) => (
            <option key={index} value={statut}>
              {statut}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau des candidatures */}
      <table border="1">
        <thead>
          <tr>
            <th>Entreprise</th>
            <th>Poste</th>
            <th>Date d'Envoi</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map((candidature) => (
            <tr key={candidature._id}>
              <td>{candidature.entreprise}</td>
              <td>{candidature.poste}</td>
              <td>{new Date(candidature.dateEnvoi).toLocaleDateString()}</td>
              <td>{candidature.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatureList;

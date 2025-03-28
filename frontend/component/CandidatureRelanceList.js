import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidatureRelanceList = () => {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/candidatures");
        const allCandidatures = response.data;

        // Déterminer la date limite (7 jours avant aujourd'hui)
        const dateLimite = new Date();
        dateLimite.setDate(dateLimite.getDate() - 7);

        // Filtrer les candidatures dont la date de relance est dépassée
        const relancesEnAttente = allCandidatures.filter((candidature) => {
          return candidature.dateRelance && new Date(candidature.dateRelance) < dateLimite;
        });

        setCandidatures(relancesEnAttente);
      } catch (error) {
        console.error("Erreur lors de la récupération des candidatures :", error);
      }
    };

    fetchCandidatures();
  }, []);

  return (
    <div>
      <h2>Candidatures à relancer</h2>
      {candidatures.length === 0 ? (
        <p>Aucune candidature à relancer.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Entreprise</th>
              <th>Poste</th>
              <th>Date d'Envoi</th>
              <th>Date de Relance</th>
            </tr>
          </thead>
          <tbody>
            {candidatures.map((candidature) => (
              <tr key={candidature._id}>
                <td>{candidature.entreprise}</td>
                <td>{candidature.poste}</td>
                <td>{new Date(candidature.dateEnvoi).toLocaleDateString()}</td>
                <td>{new Date(candidature.dateRelance).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidatureRelanceList;

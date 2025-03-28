import React, { useState, useEffect } from "react";
import { fetchCandidatures } from "../services/candidatureService";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const loadCandidatures = async () => {
      const data = await fetchCandidatures();
      setCandidatures(data);
    };
    loadCandidatures();
  }, []);

  return (
    <div>
      <h2>Liste des Candidatures</h2>
      <table>
        <thead>
          <tr>
            <th>Entreprise</th>
            <th>Poste</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map((cand) => (
            <tr key={cand._id}>
              <td>{cand.entreprise}</td>
              <td>{cand.poste}</td>
              <td>{cand.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatureList;



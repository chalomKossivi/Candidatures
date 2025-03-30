import { useEffect, useState } from "react";
import axios from "axios";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/candidatures/get");
        setCandidatures(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/candidatures/get/${id}`);
      setCandidatures(candidatures.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div>
      <h2>Liste des Candidatures</h2>
      <table>
        <thead>
          <tr>
            <th>Entreprise</th>
            <th>Poste</th>
            <th>Date d'envoi</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidatures.map((candidature) => (
            <tr key={candidature._id}>
              <td>{candidature.entreprise}</td>
              <td>{candidature.poste}</td>
              <td>{candidature.dateEnvoi}</td>
              <td>{candidature.statut}</td>
              <td>
                <button onClick={() => handleDelete(candidature._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatureList;

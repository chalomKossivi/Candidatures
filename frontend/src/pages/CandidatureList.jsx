// src/components/CandidatureList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const CandidatureList = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/candidatures/updateStatus/${id}`, { statut: newStatus });
      setCandidatures((prev) =>
        prev.map((c) => (c._id === id ? { ...c, statut: newStatus } : c))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/candidatures/${id}`);
      setCandidatures((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // 🔍 Filtrage en fonction du terme de recherche
  const filteredCandidatures = candidatures.filter((c) =>
    c.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.poste.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

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
          {filteredCandidatures.map((candidature) => (
            <tr key={candidature._id}>
              <td>{candidature.entreprise}</td>
              <td>{candidature.poste}</td>
              <td>{new Date(candidature.dateEnvoi).toLocaleDateString("fr-FR")}</td>
              <td>
                <select
                  name="statut"
                  value={candidature.statut}
                  onChange={(e) => handleStatusChange(candidature._id, e.target.value)}
                >
                  <option value="En attente">En attente</option>
                  <option value="Accepté">Accepté</option>
                  <option value="Refusé">Refusé</option>
                </select>
              </td>
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
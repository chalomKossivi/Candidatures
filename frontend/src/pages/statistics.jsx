import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './statistics.css'; // Assurez-vous d'importer le fichier CSS pour le style
import Header from "../components/Header";
const Statistics = () => {
    const [total, setTotal] = useState(0);
    const [enAttente, setEnAttente] = useState(0);
    const [acceptees, setAcceptees] = useState(0);
    const [refusees, setRefusees] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8080/api/candidatures/stats')
            .then(response => {
                setTotal(response.data.total);

                // On initialise les variables pour chaque statut
                let att = 0, acc = 0, ref = 0;

                // On parcourt les résultats renvoyés par l'API
                response.data.stats.forEach(item => {
                    if (item._id === "En attente") att = item.count;
                    else if (item._id === "Accepté") acc = item.count;
                    else if (item._id === "Refusé") ref = item.count;
                });

                // On met à jour les états avec les valeurs séparées
                setEnAttente(att);
                setAcceptees(acc);
                setRefusees(ref);
            })
            .catch(error => console.error("Erreur:", error));
    }, []);

    return (
        <>
            <Header />

            <div className="statistics-container">
                <h2>Statistiques des Candidatures</h2>
                <p>Total des candidatures : {total}</p>
                <p>En attente : {enAttente}</p>
                <p>Acceptées : {acceptees}</p>
                <p>Refusées : {refusees}</p>
            </div>
        </>
    );
};

export default Statistics;

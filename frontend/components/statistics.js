import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [stats, setStats] = useState({ total: 0, stats: [] });

    useEffect(() => {
        axios.get('http://localhost:5000/api/statistics/stats')
            .then(response => setStats(response.data))
            .catch(error => console.error("Erreur lors de la récupération des statistiques", error));
    }, []);

    return (
        <div>
            <h2>Statistiques des Candidatures</h2>
            <p>Total des candidatures : {stats.total}</p>
            <ul>
                {stats.stats.map((item, index) => (
                    <li key={index}>{item._id} : {item.count}</li>
                ))}
            </ul>
        </div>
    );
};

export default Statistics;

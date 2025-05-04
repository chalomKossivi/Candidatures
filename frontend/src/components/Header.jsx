// src/components/Header.js
import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/index.css';

const Header = ({ searchTerm, onSearchChange }) => {
  const navigate = useNavigate();

  return (
    <div className='head'>
      <h1>JobTrack</h1>

      <span className='search'>
        <input
          type="text"
          placeholder="Rechercher par entreprise ou poste"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </span>

      <div className='navigate'>
        <button className='NEW' onClick={() => navigate("/Ajouter")}>New</button>
        <button onClick={() => navigate("/statistiques")}>Statistiques</button>
        <button onClick={() => navigate("/")}>Candidatures</button>
      </div>
    </div>
  );
};

export default Header;
import React from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/index.css'

const Header = () => {

  const navigate = useNavigate(); // Hook pour changer de page

  return (

    <div className = 'head'>

      <h1>JobTrack</h1>

      <span className ='search' >
        <input type="text" className = "search-input" placeholder="Rechercher..." />
        {/* <button class="search-button">🔍</button> */}
      </span>

      {/* <span className = "menu">

        <button className = "menu-button"> &#9776; </button>
        <div className = "menu-content">
            <a href="#">Option 1</a>
            <a href="#">Option 2</a>
            <a href="#">Option 3</a>
        </div>
        
      </span> */}

      <button className='NEW' onClick={() => navigate("/Ajouter")}>New</button>

    </div>
    
  )
}

export default Header
  
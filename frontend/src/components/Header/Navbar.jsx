import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/popcorn.png';

function Navbar({ movieName, setMovieName }) {
  return (
    <nav className="navbar-sticky">
      <div className="navbar-left">
        <Link className="Link" to="/">
          <div className="navbar--logo-holder">
            <img src={Logo} alt="logo" className="navbar--logo" />
          </div>
        </Link>
        <Link className="Link" to="/counter">
          <p>Catégories</p>
        </Link>
        <div className="navbar--search">
          <input
            type="text"
            placeholder="Rechercher un film"
            value={movieName}
            className="navbar--search-input"
            onChange={(e) => setMovieName(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="navbar--link-connection">
        <Link className="Link" to="/users">
          <p>Se connecter</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

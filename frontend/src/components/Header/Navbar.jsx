import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/popcorn.png';

function Navbar({ movieName, setMovieName }) {
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      navigate('/search');
    }
  };

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
        <form className="navbar--search">
          <Link className="Link" to="/search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <input
            type="text"
            placeholder="Rechercher un film"
            value={movieName}
            className="navbar--search-input"
            onChange={(e) => setMovieName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => setMovieName('')}
          ></i>
        </form>
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

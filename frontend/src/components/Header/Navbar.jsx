/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/popcorn.png';

function Navbar({ movieName, setMovieName }) {
  const [movieNameDisplayed, setMovieNameDisplayed] = useState(movieName);
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      setMovieName(event.target.value);
      navigate('/search');
      setMovieNameDisplayed('');
    }
  };
  const handleSubmit = (event) => {
    setMovieName(event.target.value);
    navigate('/search');
    setMovieNameDisplayed('');
  };

  return (
    <nav className="navbar-sticky">
      <div className="navbar-left">
        <Link className="LinkNB" to="/">
          <div className="navbar--logo-holder">
            <img src={Logo} alt="logo" className="navbar--logo" />
          </div>
        </Link>
        <form className="navbar--search">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={handleSubmit}
          ></i>
          <input
            type="text"
            placeholder="Rechercher un film"
            className="navbar--search-input"
            value={movieNameDisplayed}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMovieNameDisplayed(e.target.value)}
          />
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => setMovieNameDisplayed('')}
          ></i>
        </form>
      </div>
      <div className="navbar--link-connection">
        <Link className="LinkNB" to="/users">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

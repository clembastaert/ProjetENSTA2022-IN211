import React, { forwardRef, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/popcorn.png';

const Navbar = forwardRef(({ movieName, setMovieName }, ref) => {
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

  return (
    <nav className="navbar-sticky" ref={ref}>
      <div className="navbar-left">
        <Link className="LinkNB" to="/">
          <div className="navbar--logo-holder">
            <img src={Logo} alt="logo" className="navbar--logo" />
          </div>
        </Link>
        <form className="navbar--search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Rechercher un film"
            className="navbar--search-input"
            value={movieNameDisplayed}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMovieNameDisplayed(e.target.value)}
          />
        </form>
      </div>
      <div className="navbar--link-connection">
        <Link className="LinkNB" to="/users">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </nav>
  );
});

export default Navbar;

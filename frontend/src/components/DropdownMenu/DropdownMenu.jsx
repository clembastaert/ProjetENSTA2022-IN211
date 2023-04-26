/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useState } from 'react';
import './DropdownMenu.css';

function DropdownMenu() {
  const [movieList, setMovieList] = useState(false);
  const [comments, setComments] = useState(false);
  const [parameters, setParameters] = useState(false);
  const [addmovie, setAddMovie] = useState(false);

  return (
    <div className="menu">
      <div className="list">
        {' '}
        <i
          className="fa-regular fa-square-caret-down"
          onClick={() => {
            setMovieList(true);
          }}
        ></i>{' '}
        <h2> Votre liste de films </h2>{' '}
      </div>
      <div className="list">
        <i
          className="fa-regular fa-square-caret-down"
          onClick={() => {
            setComments(true);
          }}
        ></i>{' '}
        <h2> Vos commentaires </h2>{' '}
      </div>
      <div className="list">
        <i
          className="fa-regular fa-square-caret-down"
          onClick={() => {
            setAddMovie(true);
          }}
        ></i>{' '}
        <h2> Ajouter un film </h2>{' '}
      </div>
      <div className="list">
        <i
          className="fa-regular fa-square-caret-down"
          onClick={() => {
            setParameters(true);
          }}
        ></i>{' '}
        <h2> Paramètres </h2>{' '}
      </div>
    </div>
  );
}

export default DropdownMenu;

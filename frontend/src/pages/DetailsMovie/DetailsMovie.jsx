/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Ratings from '../../components/Ratings/Ratings';
import Comments from '../../components/Comments/Comments';
import './DetailsMovie.css';

function DetailsMovie({ movies, connected }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);
  const [comments, setComments] = useState([]);
  const [sent, isSent] = useState(false);

  // const handleClick = (con) => {
  //   if (!con) {};
  // };

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/${id}`)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [sent]);

  if (!movie) {
    return (
      <div className="NotMoviePage">
        <p>Le film que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="MoviePage">
      <h1>{movie.title}</h1>
      <div className="MoviePresentation">
        <img
          src={`${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="MovieText">
          <p>{movie.overview}</p>
          <p>Date de sortie : {movie.release_date}</p>
          <p>
            Note moyenne : {movie.vote_average}/10 ({movie.vote_count} votes)
          </p>
          <div className="addmovie">
            <i
              className="fa-solid fa-square-plus" /*onClick={handleClick}*/
            ></i>
            <p> Ajouter ce film à votre liste </p>
          </div>
        </div>
      </div>
      <Ratings connected={connected} id_film={id} sent={sent} isSent={isSent} />
      <Comments comments={comments} />
    </div>
  );
}

export default DetailsMovie;

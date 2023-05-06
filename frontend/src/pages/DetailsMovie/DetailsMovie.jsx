/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Ratings from '../../components/Ratings/Ratings';
import Comments from '../../components/Comments/Comments';
import './DetailsMovie.css';

function DetailsMovie({ movies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);
  const [comments, setComments] = useState([]);
  const [sent, setSent] = useState(false);
  const [movieLiked, setMovieLiked] = useState(false);
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
        setConnected(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, sent]);

  useEffect(() => {
    if (connected) {
      axios
        .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/like/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(() => {
          setMovieLiked(true);
        })
        .catch(() => {
          setMovieLiked(false);
        });
      axios
        .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/comment/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(() => {
          setSent(true);
        })
        .catch(() => {
          setSent(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, username, connected]);

  function handleDel() {
    axios
      .delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/like/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        setMovieLiked(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAdd() {
    axios
      .post(
        `${import.meta.env.VITE_BACKDEND_URL}/movies/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then(() => {
        setMovieLiked(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function formatDate(date) {
    const releaseDate = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    return releaseDate.toLocaleDateString('fr-FR', options);
  }

  return movie ? (
    <div className="MoviePage">
      <h1>{movie.title}</h1>
      <div className="MoviePresentation">
        <img src={`${movie.poster_path}`} alt={movie.title} />
        <div className="MovieText">
          <p>{movie.description}</p>
          <p>Date de sortie : {formatDate(movie.release_date)}</p>
          {!loading &&
            connected &&
            (movieLiked ? (
              <div className="addmovie">
                <i className="fa-solid fa-square-minus" onClick={handleDel}></i>
                <p> Supprimer ce film de votre liste </p>
              </div>
            ) : (
              <div className="addmovie">
                <i className="fa-solid fa-square-plus" onClick={handleAdd}></i>
                <p> Ajouter ce film à votre liste </p>
              </div>
            ))}
        </div>
      </div>
      {!loading && !sent && (
        <Ratings
          connected={connected}
          id_film={id}
          setSent={setSent}
          username={username}
        />
      )}
      {comments.length > 0 && <Comments comments={comments} />}
    </div>
  ) : (
    <div className="NotMoviePage">
      <p> </p>
    </div>
  );
}

export default DetailsMovie;

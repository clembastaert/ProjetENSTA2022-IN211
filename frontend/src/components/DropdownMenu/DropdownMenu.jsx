/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useEffect, useState } from 'react';
import './DropdownMenu.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import Movie from '../Movie/Movie';
import AddMovieForm from '../AddMovieForm/AddMovieForm';

function DropdownMenu({ username, movies }) {
  const [movieList, setMovieList] = useState(false);
  const [moviesLiked, setMoviesLiked] = useState([]);
  const [commentList, setCommentList] = useState(false);
  const [comments, setComments] = useState([]);
  const [parameters, setParameters] = useState(false);
  const [addmovie, setAddMovie] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/${username}`)
      .then((response) => {
        setMoviesLiked(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/u/u/${username}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  function deleteUser() {
    axios
      .delete(`${import.meta.env.VITE_BACKDEND_URL}/users/${username}`)
      .then(() => {
        console.log(`User ${username} successfully deleted`);
      })
      .catch((error) => {
        console.error(`Error while deleting user ${username}:`, error);
      });
  }

  function deleteComment(movieid) {
    axios
      .delete(
        `${import.meta.env.VITE_BACKDEND_URL}/comments/${movieid}/${username}`
      )
      .then(() => {
        console.log(`Comment successfully deleted`);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id_film !== movieid)
        );
      })
      .catch((error) => {
        console.error(`Error while deleting comment`, error);
      });
  }

  return (
    <div className="menu">
      <div
        className="list"
        onClick={() => {
          setMovieList(!movieList);
        }}
      >
        <i className="fa-regular fa-square-caret-down"></i>{' '}
        <h2> Votre liste de films </h2>
      </div>
      {movieList && (
        <div className="MovieList">
          {moviesLiked.map((movie) => (
            <Movie movie={movie} />
          ))}
        </div>
      )}
      <div
        className="list"
        onClick={() => {
          setCommentList(!commentList);
        }}
      >
        <i className="fa-regular fa-square-caret-down"></i>{' '}
        <h2> Vos commentaires </h2>{' '}
      </div>
      {commentList && (
        <div className="CommentList">
          {comments.map((comment) => {
            const movie = movies.find((m) => m.id === comment.id_film);

            return (
              <div className="Comment2" key={comment.id_film}>
                <Link to={`/films/${movie.id}`}>
                  <img src={`${movie.poster_path}`} alt={movie.title} />
                </Link>
                <div className="opinion">
                  <div className="ratingandicons">
                    <Rating size={27} initialValue={comment.mark} readonly />
                    <div className="icons">
                      {' '}
                      <i className="fa-solid fa-pen"></i>{' '}
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                          deleteComment(movie.id);
                        }}
                      ></i>
                    </div>
                  </div>
                  <p className="descriptionComments">{comment.description} </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        className="list"
        onClick={() => {
          setAddMovie(!addmovie);
        }}
      >
        <i className="fa-regular fa-square-caret-down"></i>{' '}
        <h2> Ajouter un film </h2>{' '}
      </div>
      {addmovie && <AddMovieForm />}
      <div
        className="list"
        onClick={() => {
          setParameters(!parameters);
        }}
      >
        <i className="fa-regular fa-square-caret-down"></i>{' '}
        <h2> Paramètres </h2>{' '}
      </div>
      {parameters && (
        <div className="DeleteUser">
          <i class="fa-solid fa-trash" onClick={deleteUser}></i>
          <p> Supprimer son compte </p>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;

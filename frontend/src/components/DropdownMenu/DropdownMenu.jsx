/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useEffect, useState } from 'react';
import './DropdownMenu.css';
import axios from 'axios';
import Movie from '../Movie/Movie';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import DeleteUser from '../DeleteUser/DeleteUser';
import DropdownMenuItem from '../DropdownMenuItem/DropdownMenuItem';
import ChangePassword from '../ChangePassword/ChangePassword';
import MenuComments from '../MenuComments/MenuComments';

function DropdownMenu({ username, movies, setConnection }) {
  const [moviesLiked, setMoviesLiked] = useState([]);
  const [comments, setComments] = useState([]);

  const [movieList, setMovieList] = useState(false);
  const [commentList, setCommentList] = useState(false);
  const [parameters, setParameters] = useState(false);
  const [addmovie, setAddMovie] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/recup`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setMoviesLiked(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/comments/recup`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  return (
    <div className="menu">
      <DropdownMenuItem
        bool={movieList}
        setBool={setMovieList}
        title="Votre liste de films"
      >
        {movieList && (
          <div className="MovieList">
            {moviesLiked.map((movie) => (
              <Movie movie={movie} />
            ))}
          </div>
        )}
      </DropdownMenuItem>

      <DropdownMenuItem
        bool={commentList}
        setBool={setCommentList}
        title="Vos commentaires"
      >
        {commentList && (
          <MenuComments
            comments={comments}
            setComments={setComments}
            movies={movies}
          />
        )}
      </DropdownMenuItem>

      <DropdownMenuItem
        bool={addmovie}
        setBool={setAddMovie}
        title="Ajouter un film"
      >
        {addmovie && <AddMovieForm />}
      </DropdownMenuItem>

      <DropdownMenuItem
        bool={parameters}
        setBool={setParameters}
        title="Paramètres"
      >
        {parameters && (
          <div className="parameters">
            <ChangePassword />
            <DeleteUser username={username} setConnection={setConnection} />
          </div>
        )}
      </DropdownMenuItem>
    </div>
  );
}

export default DropdownMenu;

import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

function AddMovieForm() {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleReleaseDateChange(event) {
    setReleaseDate(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handlePosterPathChange(event) {
    setPosterPath(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('/movies/new', {
        title,
        release_date: releaseDate,
        description,
        poster_path: posterPath,
      })
      .then((response) => {
        console.log('New movie created:', response.data);
        setTitle('');
        setReleaseDate('');
        setDescription('');
        setPosterPath('');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Error while creating the movie.');
      });
  }

  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="addMovieForm">
        <div className="TitleandDate">
          <label className="formPlaceTitle">
            <p> Titre: </p>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="formEntry2"
            />
          </label>
          <label className="formPlaceDate">
            <p> Date de sortie:</p>
            <input
              type="date"
              value={releaseDate}
              onChange={handleReleaseDateChange}
              className="formEntry2"
            />
          </label>
        </div>
        <label className="formPlaceDescription">
          Description:
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            className="formEntryDescription"
          />
        </label>
        <div className="AfficheandSend">
          <label className="formPlaceAffiche">
            <p> Affiche: </p>
            <input
              type="text"
              value={posterPath}
              onChange={handlePosterPathChange}
              className="formEntry2"
            />
          </label>
          <button type="submit" className="formSend">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovieForm;

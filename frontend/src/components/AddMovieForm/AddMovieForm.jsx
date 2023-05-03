import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

function AddMovieForm() {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comédie' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentaire' },
    { id: 18, name: 'Drame' },
    { id: 10751, name: 'Familial' },
    { id: 14, name: 'Fantastique' },
    { id: 36, name: 'Histoire' },
    { id: 27, name: 'Horreur' },
    { id: 10402, name: 'Musique' },
    { id: 9648, name: 'Mystère' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science-Fiction' },
    { id: 10770, name: 'Téléfilm' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'Guerre' },
    { id: 37, name: 'Western' },
  ];

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

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, {
        title,
        release_date: releaseDate,
        description,
        poster_path: posterPath,
        category_id: category,
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
      .then((response) => {
        console.log('New movie created:', response.data);
        setTitle('');
        setReleaseDate('');
        setDescription('');
        setPosterPath('');
        setCategory('');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error(error);
        if (error.code === '23505') {
          setErrorMessage('Movie with title' + title + 'already exists.');;
        } else {
          setErrorMessage('Error while creating the movie.');
        };
      });
  }


  return (
    <div>
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
        <label className="formPlaceAffiche">
          URL de l'image:
          <input
            type="text"
            value={posterPath}
            onChange={handlePosterPathChange}
            className="formEntry2"
          />
        </label>
        <div className="formPlaceCategories">
          <label className="formEntryCategory" htmlFor="options">
            Catégorie:{' '}
          </label>
          <select
            id="options"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value=""> -- Choisir une catégorie -- </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type="submit" className="formSend">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AddMovieForm;

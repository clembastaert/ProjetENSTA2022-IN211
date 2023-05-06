/* eslint-disable import/no-extraneous-dependencies */
import './Ratings.css';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Ratings = ({ connected, id_film, setSent, username }) => {
  const [description, setDescription] = useState('');
  const [mark, setMark] = useState(0);

  const handleRating = (selectedMark) => {
    setMark(selectedMark);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      username,
      description,
      id_film,
      mark,
    };

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/comments/new`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        setSent(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return connected ? (
    <form className="Ratings" onSubmit={handleSubmit}>
      <p className="titleComments"> Donnez votre avis : </p>
      <Rating size={27} onClick={handleRating} />
      <textarea
        type="text"
        placeholder="Ajouter un commentaire"
        id="comments"
        name="comments"
        value={description}
        className="comments"
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <button className="sendRating"> Envoyer </button>
    </form>
  ) : (
    <Link className="LinkCO" to="/users">
      Connectez-vous pour ajouter des films à votre liste ou un commentaire{' '}
    </Link>
  );
};

export default Ratings;

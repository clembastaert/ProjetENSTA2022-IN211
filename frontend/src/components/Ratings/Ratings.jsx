import './Ratings.css';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';

const Ratings = () => {
  const [commentaries, setCommentaries] = useState('');

  return (
    <div className="Ratings">
      <p className="titleCommentaries"> Donnez votre avis : </p>
      <Rating size={27} />
      <textarea
        type="text"
        placeholder="Ajouter un commentaire"
        id="commentaries"
        name="commentaries"
        value={commentaries}
        className="commentaries"
        onChange={(event) => setCommentaries(event.target.value)}
        required
      />
      <button className="sendRating"> Envoyer </button>
    </div>
  );
};

export default Ratings;

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import './MenuComments.css';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

function MenuComments({ comments, setComments, movies }) {
  function deleteComment(movieid) {
    axios
      .delete(`${import.meta.env.VITE_BACKDEND_URL}/comments/${movieid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
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
  );
}

export default MenuComments;

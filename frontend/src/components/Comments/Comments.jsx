import './Comments.css';
import { Rating } from 'react-simple-star-rating';

const Comments = ({ comments }) => {
  return (
    <div className="Comments">
      {comments.map((comment) => (
        <div className="Comment" key={comment.id}>
          <div className="usernamemark">
            <Rating size={27} initialValue={comment.mark} readonly />{' '}
            <p className="usernameComments"> @{comment.username}</p>{' '}
          </div>
          <p className="descriptionComments">{comment.description}</p>{' '}
        </div>
      ))}
    </div>
  );
};

export default Comments;

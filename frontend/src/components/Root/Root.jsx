import './Root.css';
import Header from '../Header/Header';

export const Root = ({ children, movieName, setMovieName }) => {
  return (
    <div className="Root-container">
      <Header movieName={movieName} setMovieName={setMovieName} />
      <div className="Root-content">{children}</div>
    </div>
  );
};

import './Root.css';
import useSticky from '../Navbar/useSticky.jsx';
import Navbar from '../Navbar/Navbar';

export const Root = ({ children, movieName, setMovieName }) => {
  const { isSticky, element } = useSticky();

  return (
    <div className="Root-container">
      <Navbar
        sticky={isSticky}
        movieName={movieName}
        setMovieName={setMovieName}
        ref={element}
      />
      <div className="Root-content">{children}</div>
    </div>
  );
};

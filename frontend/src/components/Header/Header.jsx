import './Header.css';
import Navbar from './Navbar';
import useSticky from './useSticky.jsx';

function Header({ movieName, setMovieName }) {
  const { isSticky, element } = useSticky();

  return (
    <div>
      <Navbar
        sticky={isSticky}
        movieName={movieName}
        setMovieName={setMovieName}
        ref={element}
      />
    </div>
  );
}

export default Header;

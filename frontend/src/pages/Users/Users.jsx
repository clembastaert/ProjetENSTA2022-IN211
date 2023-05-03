/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import { useEffect, useState } from 'react';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './Users.css';

function Users({ movies }) {
  const [username, setUsername] = useState('');
  const [connected, setConnection] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKDEND_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUsername(response.data);
        setConnection(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('token')) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, [connected]);

  return loading ? (
    <div> </div>
  ) : connected ? (
    <div className="User-connected">
      <h1> Bonjour @{username} </h1>
      <DropdownMenu
        movies={movies}
        username={username}
        setConnection={setConnection}
      />
      <div
        className="disconnection"
        onClick={() => {
          setConnection(false);
          localStorage.clear('token');
        }}
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <p>Se déconnecter</p>
      </div>
    </div>
  ) : (
    <div className="Users-container">
      <LoginForm setConnection={setConnection} />
      <SignUpForm setConnection={setConnection} />
    </div>
  );
}

export default Users;

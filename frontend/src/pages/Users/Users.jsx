import './Users.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

function Users({ connected, setConnection }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (connected) {
      axios
        .get(`${import.meta.env.VITE_BACKDEND_URL}/users/me`)
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [connected]);

  return connected ? (
    <div className="User-connected">
      {' '}
      <h1> Bonjour {username} </h1>{' '}
    </div>
  ) : (
    <div className="Users-container">
      <LoginForm setConnection={setConnection} />
      <SignUpForm setConnection={setConnection} />
    </div>
  );
}

export default Users;

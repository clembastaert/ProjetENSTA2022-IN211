/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Users.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';

function Users() {
  const [username, setUsername] = useState('');
  const [connected, setConnection] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users/me`, { withCredentials: true })
      .then((response) => {
        setUsername(response.data);
        setConnection(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [connected]);

  return connected ? (
    <div className="User-connected">
      <h1> Bonjour @{username}toto </h1>
      <DropdownMenu />
      <div
        className="disconnection"
        onClick={() => {
          setConnection(false);
        }}
      >
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <p> Se déconnecter </p>
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

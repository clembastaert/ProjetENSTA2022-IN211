import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

function LoginForm({ setConnection }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { email, password };

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/login`, formData, { withCredentials: true })
      .then((response) => {
        setConnection(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="connectionForm">
      <h1 className="formTitle"> Se connecter </h1>
      <div className="formPlace">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className="formEntry"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="formPlace">
        <label htmlFor="password">Mot de passe</label>
        <div className="password-input">
          <input
            type="password"
            id="password"
            name="password"
            className="formEntry"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <button type="submit" className="formButton">
          Connexion
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

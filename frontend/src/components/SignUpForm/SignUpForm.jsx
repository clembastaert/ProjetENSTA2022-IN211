import React, { useState } from 'react';
import './SignUpForm.css';
import axios from 'axios';

function SignUpForm({ setConnection }) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const formData = { username, firstname, lastname, email, password };

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/users/signup`, formData)
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        setConnection(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="connectionForm">
      <h1 className="formTitle"> Créer un compte </h1>
      <div className="formPlace">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          className="formEntry"
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div className="formPlace">
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="formEntry"
          value={firstname}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div className="formPlace">
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="formEntry"
          value={lastname}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>
      <div className="formPlace">
        <label htmlFor="email">Email</label>
        <input
          type="email"
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
          Créer un compte
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;

import React, { useState } from 'react';
import './SignUpForm.css';
import axios from 'axios';
import FormPlace from '../FormPlace/FormPlace';

function SignUpForm({ setConnection }) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="connectionForm">
      <h1 className="formTitle"> Créer un compte </h1>
      <FormPlace
        label="Nom d'utilisateur"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <FormPlace
        label="Prénom"
        name="firstname"
        value={firstname}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <FormPlace
        label="Nom"
        name="lastname"
        value={lastname}
        onChange={(event) => setLastName(event.target.value)}
      />
      <FormPlace
        label="Email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormPlace
        type="password"
        label="Mot de passe"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div>
        <button type="submit" className="formButton">
          Créer un compte
        </button>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
    </form>
  );
}

export default SignUpForm;

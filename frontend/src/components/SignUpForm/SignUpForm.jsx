import React, { useState } from 'react';
import './SignUpForm.css';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer le formulaire via une requête AJAX
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="formEntry"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div className="formPlace">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="formEntry"
          value={lastName}
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
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="formEntry"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {/* <span onClick={togglePasswordVisibility}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span> */}
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

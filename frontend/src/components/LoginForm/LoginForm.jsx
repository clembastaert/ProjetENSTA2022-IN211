import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
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
      <h1 className="formTitle"> Se connecter </h1>
      <div className="formPlace">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          name="username"
          className="formEntry"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
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
          Connexion
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ChangePassword.css';
import axios from 'axios';
import { useState } from 'react';
import FormPlace from '../FormPlace/FormPlace';

function ChangePassword() {
  const [modify, setModify] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = (event) => {
    event.preventDefault();
    const formData = { oldPassword, newPassword };

    axios
      .put(`${import.meta.env.VITE_BACKDEND_URL}/users/password`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
        setOldPassword('');
        setNewPassword('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="ChangePassword">
      <div className="titleChangePassword">
        <i
          className="fa-solid fa-pen"
          onClick={() => {
            setModify(!modify);
            setNewPassword('');
            setMessage('');
            setOldPassword('');
          }}
        ></i>
        <p> Changer son mot de passe </p>
      </div>
      {modify && (
        <form onSubmit={handleChangePassword} className="writeOldNew">
          {message && <p className="pdMessage">*{message}</p>}
          <FormPlace
            type="password"
            label="Ancien mot de passe"
            name="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
          <FormPlace
            type="password"
            label="Nouveau mot de passe"
            name="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <button type="submit" className="formSend margin-top">
            {' '}
            Changer
          </button>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;

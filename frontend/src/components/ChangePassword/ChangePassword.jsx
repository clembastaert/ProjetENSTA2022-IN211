/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ChangePassword.css';
import axios from 'axios';
import { useState } from 'react';

function ChangePassword() {
  const [modify, setModify] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = (event) => {
    event.preventDefault();

    const formData = { oldPassword, newPassword };

    axios
      .put(`${import.meta.env.VITE_BACKDEND_URL}/users/password`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        console.log(`Password sucessfully changed`);
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
          }}
        ></i>
        <p> Changer son mot de passe </p>
      </div>
      {modify && (
        <form onSubmit={handleChangePassword} className="writeOldNew">
          <div className="formPlacePassword">
            <label htmlFor="oldPassword"> Ancien mot de passe :</label>
            <input
              type="password"
              className="formEntryPassword"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </div>
          <div className="formPlacePassword">
            <label htmlFor="newPassword">Nouveau mot de passe :</label>
            <input
              type="password"
              className="formEntryPassword"
              id="Password"
              name="newPassword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="formSend">
            {' '}
            Changer
          </button>
        </form>
      )}
    </div>
  );
}

export default ChangePassword;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import './DeleteUser.css';

function DeleteUser({ username, setConnection }) {
  function deleteUser() {
    axios
      .delete(`${import.meta.env.VITE_BACKDEND_URL}/users/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        setConnection(false);
        localStorage.clear('token');
        console.log(`User ${username} successfully deleted`);
      })
      .catch((error) => {
        console.error(`Error while deleting user ${username}:`, error);
      });
  }

  return (
    <div className="DeleteUser">
      <i className="fa-solid fa-trash" onClick={deleteUser}></i>
      <p> Supprimer son compte </p>
    </div>
  );
}

export default DeleteUser;

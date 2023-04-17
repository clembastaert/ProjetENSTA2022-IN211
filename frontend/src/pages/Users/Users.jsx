import './Users.css';
// import AddUserForm from '../../components/AddUserForm/AddUserForm';
// import UsersTable from '../../components/UsersTable/UsersTable';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

function Users() {
  return (
    <div className="Users-container">
      {/* <AddUserForm />
      <UsersTable /> */}
      <LoginForm />
      <SignUpForm />
    </div>
  );
}

export default Users;

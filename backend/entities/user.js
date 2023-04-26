import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    username: { primary: true, type: String, unique: true },
    email: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String },
  },
});

export default User;

import typeorm from 'typeorm';

const Likes = new typeorm.EntitySchema({
  name: 'Likes',
  columns: {
    username: { type: String, primary: true },
    id_film: { type: String, primary: true },
    like: { type: Boolean },
  },
  primaryKeys: ['username', 'id_film'],
});

export default Likes;

import typeorm from 'typeorm';

const Movies = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: { type: Date },
  },
});

export default Movies;

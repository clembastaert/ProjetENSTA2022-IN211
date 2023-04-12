import typeorm from 'typeorm';

const Movies = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    Title: {
      type: String,
      unique: true,
    },
    ReleaseDate: { type: Date },
  },
});

export default Movies;

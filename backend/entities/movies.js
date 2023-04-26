import typeorm from 'typeorm';

const Movies = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: { primary: true, generated: 'uuid', type: String },
    title: { type: String, unique: true },
    release_date: { type: Date },
    description: { type: String },
    genre_ids: { type: 'simple-array' },
    poster_path: { type: String },
    popularity: { type: Number },
    vote_count: { type: Number },
    vote_average: { type: 'decimal', precision: 5, scale: 3 },
  },
});

export default Movies;

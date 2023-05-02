import axios from 'axios';
import { appDataSource } from './datasource.js';
import Movies from './entities/movies.js';




async function populateDatabase() {
  try {
    for (let j = 1; j < 1000; j++) {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/all/day?',
        {
          params: {
            api_key: '15d2ea6d0dc1d476efbca3eba2b9bbfb',
            language: 'fr-FR',
            page: j,
          },
        }
      );
      const movies = response.data.results;
      const MoviesRepository = appDataSource.getRepository(Movies);
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        if (!movie.title || !movie.release_date) {
          continue;
        }
        const existingMovie = await MoviesRepository.findOne({
          where: { title: movie.title },
        });
        if (existingMovie) {
          continue;
        }
        const newMovie = MoviesRepository.create({
          title: movie.title,
          release_date: movie.release_date,
          description: movie.overview,
          genre_ids: movie.genre_ids,
          poster_path: 'https://image.tmdb.org/t/p/w200' + movie.poster_path,
          popularity: Math.round(movie.popularity * 100),
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        });
        await MoviesRepository.insert(newMovie);
      }
    }

    console.log('Movies successfully added to the database');
  } catch (error) {
    console.error('Error while retrieving movies from TMDB', error);
  }
}






export default populateDatabase;

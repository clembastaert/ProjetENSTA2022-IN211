import express from 'express';
import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Movies from '../entities/movies.js';

const router = express.Router();

router.get('/', (req, res) => {
  appDataSource
    .getRepository(Movies)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while finding movies' });
    });
});

router.get('/tmdb', async (req, res) => {
  try {
    for (let j = 1; j < 100; j++) {
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
        if (!movie.title || !movie.release_date || !movie.overview) {
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

    res
      .status(200)
      .json({ message: 'Movies successfully added to the database' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error while retrieving movies from TMDB' });
  }
});

router.post('/new', function (req, res) {
  const MoviesRepository = appDataSource.getRepository(Movies);
  const newMovie = MoviesRepository.create({
    title: req.body.title,
    release_date: req.body.release_date,
  });
  MoviesRepository.insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with title "${newMovie.Title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Movie' });
      }
    });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movies)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;

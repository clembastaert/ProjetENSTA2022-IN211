import express from 'express';
import { appDataSource } from '../datasource.js';
import Movies from '../entities/Movies.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log("L'utilisateur accède à l'URL /api/movies");
  appDataSource
    .getRepository(Movies)
    .then(function (movies) {
      res.status(200).json(movies);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while retrieving movies' });
    });
});

router.post('/new', function (req, res) {
  const MoviesRepository = appDataSource.getRepository(Movies);
  const newMovie = MoviesRepository.create({
    Title: req.body.Title,
    ReleaseDate: req.body.ReleaseDate,
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

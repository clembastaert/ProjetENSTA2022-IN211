import express from 'express';
import axios from 'axios';
import { In } from 'typeorm';
import { appDataSource } from '../datasource.js';
import Movies from '../entities/movies.js';
import Likes from '../entities/likes.js';
import auth from '../middleware/auth.js';
//import multer from '../middleware/multer-config.js';


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

// il faudrait ajouter multer ici
router.post('/new', auth, function (req, res) {
  const MoviesRepository = appDataSource.getRepository(Movies);
  const newMovie = MoviesRepository.create({
    title: req.body.title,
    release_date: req.body.release_date,
    genre_ids: req.body.category_id,
    description: req.body.description,
    poster_path: req.body.poster_path,
    popularity: 0,
    vote_count: 0,
    vote_average: 0,
  });
  MoviesRepository.insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with title "${newMovie.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Movie' });
      }
    });
});

router.get('/:username', auth, async (req, res) => {
  const likesRepository = appDataSource.getRepository(Likes);
  const moviesRepository = appDataSource.getRepository(Movies);
  const { username } = req.username;

  try {
    const likesByUser = await likesRepository.find({ where: { username } });
    const idFilmsLikedByUser = likesByUser.map((like) => like.id_film);
    const moviesLikedByUser = await moviesRepository.find({
      where: { id: In(idFilmsLikedByUser) },
    });
    res.status(200).json(moviesLikedByUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des films' });
  }
});

router.get('/:id_film/:username', auth, function (req, res) {
  appDataSource
    .getRepository(Likes)
    .findOne({
      where: { id_film: req.params.id_film, username: req.params.username },
    })
    .then(function (like) {
      if (like !== null) {
        res.status(204).json({ message: 'Liked' });
      } else {
        res.status(404).json({ message: 'Not Liked' });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.post('/:id_film/:username', auth, async (req, res) => {
  const likesRepository = appDataSource.getRepository(Likes);
  const { id_film, username } = req.params;
  const newLike = likesRepository.create({
    id_film: id_film,
    username: username,
    like: true,
  });

  likesRepository
    .insert(newLike)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Like by "${newLike.username}" already done`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding the like' });
      }
    });
});

router.delete('/:id_film/:username', auth, function (req, res) {
  appDataSource
    .getRepository(Likes)
    .delete({ id_film: req.params.id_film, username: req.params.username })
    .then(function () {
      res.status(204).json({ message: 'Like successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the like' });
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

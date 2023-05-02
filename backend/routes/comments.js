import express from 'express';
import { appDataSource } from '../datasource.js';
import Comments from '../entities/comments.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/new', auth, function (req, res) {
  const commentsRepository = appDataSource.getRepository(Comments);
  const newComment = commentsRepository.create({
    id_film: req.body.id_film,
    username: req.username,
    mark: req.body.mark,
    description: req.body.description,
  });
  commentsRepository
    .insert(newComment)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `comment with title "${newComment.Title}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the Comment' });
      }
    });
});

router.get('/:id_film', async (req, res) => {
  const commentsRepository = appDataSource.getRepository(Comments);
  const { id_film } = req.params;

  try {
    const comments = await commentsRepository.find({
      where: { id_film },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des commentaires' });
  }
});

router.get('/u/u/:username', auth, async (req, res) => {
  const commentsRepository = appDataSource.getRepository(Comments);
  const { username } = req.username;

  try {
    const comments = await commentsRepository.find({
      where: { username },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des commentaires' });
  }
});

router.get('/:id_film/:username', auth, function (req, res) {
  appDataSource
    .getRepository(Comments)
    .findOne({
      where: { id_film: req.params.id_film, username: req.params.username },
    })
    .then(function (elt) {
      if (elt !== null) {
        res.status(204).json({ message: 'Commented' });
      } else {
        res.status(404).json({ message: 'Not commented' });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.put('/:id_film/:username', auth, function (req, res) {
  const id_film = req.params.id_film;
  const username = req.username;
  const { description, mark } = req.body;

  appDataSource
    .getRepository(Comments)
    .findOne({
      where: { id_film, username },
    })
    .then((comment) => {
      if (comment) {
        comment.description = description || comment.description;
        comment.mark = mark || comment.mark;
        appDataSource.getRepository(Comments).save(comment);
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    })
    .then(() => {
      res.status(200).json({ message: 'Comment successfully updated' });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.delete('/:id_film/:username', auth, function (req, res) {
  appDataSource
    .getRepository(Comments)
    .delete({ id_film: req.params.id_film, username: req.username })
    .then(function () {
      res.status(204).json({ message: 'Comment successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the comment' });
    });
});

export default router;

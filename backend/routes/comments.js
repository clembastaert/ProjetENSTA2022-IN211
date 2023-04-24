import express from 'express';
import { appDataSource } from '../datasource.js';
import Comments from '../entities/comments.js';

const router = express.Router();

router.post('/new', function (req, res) {
  const commentsRepository = appDataSource.getRepository(Comments);
  const newComment = commentsRepository.create({
    id_film: req.body.id_film,
    username: req.body.username,
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
    const comments = await commentsRepository.find({ where: { id_film } });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des commentaires' });
  }
});

export default router;

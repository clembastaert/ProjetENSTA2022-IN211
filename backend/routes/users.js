/* eslint-disable no-shadow */
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import Likes from '../entities/likes.js';
import Comments from '../entities/comments.js';

const router = express.Router();

router.get('/me', auth, function (req, res) {
  res.json(req.username);
});

router.get('/comm', function (req, res) {
  appDataSource
    .getRepository(Comments)
    .find({ where: {} })
    .then(function (users) {
      res.json({ users: users });
    });
});

router.put('/password', auth, function (req, res) {
  appDataSource
    .getRepository(User)
    .findOne({ where: { username: req.username } })
    .then((user) =>
      bcrypt.compare(req.body.oldPassword, user.password).then((valid) => {
        if (!valid) {
          return res.json({ message: 'Mot de passe incorrect' });
        }
        bcrypt.hash(req.body.newPassword, 10).then((hash) => {
          user.password = hash;
          appDataSource
            .getRepository(User)
            .save(user)
            .then(() =>
              res.json({ message: 'Mot de passe modifié avec succès' })
            )
            .catch(() =>
              res.status(500).json({
                message:
                  'Une erreur est survenue lors de la modification du mot de passe',
              })
            );
        });
      })
    )
    .catch(() =>
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la recherche de l'utilisateur",
      })
    );
});

router.post('/login', function (req, res) {
  appDataSource
    .getRepository(User)
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte' });
          }
          const token = jwt.sign(
            { username: user.username },
            'RANDOM_TOKEN_SECRET',
            {
              expiresIn: '24h',
            }
          );
          res.status(200).json({
            token: token,
            message: 'Connexion réussie',
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});
router.post('/signup', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  userRepository
    .findOne({ where: { email: req.body.email } })
    .then((userWithEmail) => {
      if (userWithEmail) {
        return res.status(400).json({
          message: `Adresse "${req.body.email}" déjà utilisée`,
        });
      }
      userRepository
        .findOne({ where: { username: req.body.username } })
        .then((userWithUsername) => {
          if (userWithUsername) {
            return res.status(400).json({
              message: `Nom d'utilisateur "${req.body.username}" déjà utilisé`,
            });
          }
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const newUser = userRepository.create({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: hash,
              });
              userRepository
                .insert(newUser)
                .then(function (user) {
                  const token = jwt.sign(
                    { username: user.username },
                    'RANDOM_TOKEN_SECRET',
                    {
                      expiresIn: '24h',
                    }
                  );
                  res.status(200).json({
                    token: token,
                    message: 'Connexion réussie',
                  });
                })
                .catch(() => {
                  res.status(500).json({
                    message:
                      "Une erreur est survenue lors de l'enregistrement de l'utilisateur",
                  });
                });
            })
            .catch(() => {
              res.status(500).json({
                message: 'Une erreur est survenue lors de la création du hash',
              });
            });
        })
        .catch(() => {
          res.status(500).json({
            message:
              "Une erreur est survenue lors de la recherche de l'utilisateur",
          });
        });
    })
    .catch(() => {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de la recherche de l'utilisateur",
      });
    });
});

router.delete('/delete', auth, function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ username: req.username })
    .then(function () {
      return appDataSource
        .getRepository(Likes)
        .delete({ username: req.username });
    })
    .then(function () {
      return appDataSource
        .getRepository(Comments)
        .delete({ username: req.username });
    })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;

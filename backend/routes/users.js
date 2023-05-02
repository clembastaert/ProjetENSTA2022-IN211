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
            message: 'Logged in successfully',
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
          res.cookie('token', token, { httpOnly: true, secure: true });
          res.status(200).json({
            message: 'Logged in successfully',
          });
        })
        .catch(function (error) {
          console.error(error);
          if (error.code === '23505') {
            res.status(400).json({
              message: `User with email "${newUser.email}" already exists`,
            });
          } else {
            res.status(500).json({ message: 'Error while creating the user' });
          }
        });
    })
    .catch((error) => res.status(500).json({ error }));
});

router.delete('/:username', auth, function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ username: req.username })
    .getRepository(Likes)
    .delete({ username: req.username })
    .getRepository(Comments)
    .delete({ username: req.username })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

export default router;

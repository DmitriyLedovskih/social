const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('mongoose').Error;
const User = require('../models/user');
const {
  CREATE_STATUS,
} = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const sendUser = require('../utils/sendUser');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => sendUser(res, user))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => sendUser(res, user))
    .catch(next);
};

const register = (req, res, next) => {
  const {
    firstname,
    lastname,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        firstname,
        lastname,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-key', { expiresIn: '7d' });

          res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'none'
          }).status(CREATE_STATUS).send({ data: user });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Email уже занят'));
          } else if (err instanceof ValidationError) {
            next(new BadRequestError('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-key', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ data: user });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли из системы' });
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  register,
  login,
  logout,
};

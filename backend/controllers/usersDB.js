const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');
const CastError = require('../errors/castError');
const NotFoundUserError = require('../errors/notFoundUserError');
const SameEmailError = require('../errors/sameEmailError');

// ! получаем всех пользователей
const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Нет такого пользователя'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Вы прислали странный запрос'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((encryptedPassword) => {
      User.create({
        email,
        password: encryptedPassword,
        name,
        about,
        avatar,
      })
        .then((user) => {
          res.status(200).send({
            data: {
              email: user.email,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
            },
          });
        })
        .catch((err) => {
          if (!email || !password) {
            return next(new CastError('Вы не заполнили обязательные поля'));
          }
          if (err.name === 'MongoError' && err.code === 11000) {
            return next(new SameEmailError('Пользователь с такой почтой уже зарегистрирован'));
          }
          return next(err);
        });
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Нет такого пользователя'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  const { _id = '' } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(' Пользователя, чей аватар вы пытаетесь изменить, нет в базе'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundUserError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotFoundUserError('Неправильные почта или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'very-secret-key',
            { expiresIn: '7d' },
          );

          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
            .status(201).send({
              message: 'Аутентификация прошла успешно',
            });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Такого пользователя нет в базе'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Вы прислали странный запрос'));
      }
      return next(err);
    });
};

module.exports = {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar, login, getCurrentUser,
};

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants;
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный id ${req.params.userId}`));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Пользователь ${req.params.userId} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: 'true', runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Пользователь ${req.params.userId} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: 'true', runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Пользователь ${req.params.userId} не найден`));
      } else {
        next(err);
      }
    });
};

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const RegexUrl = require('../utils/RegexUrl');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().pattern(RegexUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(10),
  }),
}), createUser);

module.exports = router;

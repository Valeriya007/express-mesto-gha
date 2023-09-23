const mongoose = require('mongoose');
const RegexUrl = require('../utils/RegexUrl');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле должно быть заполненно'],
    validate: {
      validator(url) {
        return RegexUrl.test(url);
      },
      message: 'Введите корректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);

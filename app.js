const express = require('express');
const mongoose = require('mongoose');
const expressRateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleServerError = require('./middlewares/handleServerError');

const { PORT = 3000, MONGODB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

const app = express();

const limiter = expressRateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use('/', require('./routes/index'));

app.use(errors());

app.use(handleServerError);

app.listen(PORT);

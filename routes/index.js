const router = require('express').Router();
const auth = require('../middlewares/auth');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use(auth);

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

const router = require('express').Router();

const { validateSignin, validateSignup } = require('../middlewares/validation');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const userRouter = require('./users');
const movieRouter = require('./movies');

// запуск роутеров без авторизации
// Валидация по полям name, email, password
router.post('/signup', validateSignup, createUser);

// Валидация по полям email, password
router.post('/signin', validateSignin, loginUser);

// защита маршрутов авторизацией
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

// ошибка при не найденной странице
router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;

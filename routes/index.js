const router = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

// запуск роутеров без авторизации
router.post('/signup', createUser);
router.post('/signin', loginUser);

// защита маршрутов авторизацией
router.use(auth);
router.use('/users', require('./users'));
router.use('/movie', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = router;

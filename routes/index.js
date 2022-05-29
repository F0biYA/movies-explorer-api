const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

// запуск роутеров без авторизации
// Валидация по полям name, email, password
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// Валидация по полям email, password
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginUser);

// защита маршрутов авторизацией
router.use(auth);
router.use('/users', require('./users'));
router.use('/movie', require('./movies'));

router.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = router;

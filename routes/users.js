const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// импорт контроллеров пользователя
const {
  getUser,
  updateUser,
} = require('../controllers/users');

// РОутеры:

// GET /users/me возвращает информацию о пользователе (email и имя)
router.get('/me', getUser);

// PATCH /users/me обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), updateUser);

module.exports = router;

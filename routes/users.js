const router = require('express').Router();

// импорт контроллеров пользователя
const {
  getUser,
  updateUser,
} = require('../controllers/users');

// РОутеры:

// GET /users/me возвращает информацию о пользователе (email и имя)
router.get('/me', getUser);

// PATCH /users/me обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUser);

module.exports = router;

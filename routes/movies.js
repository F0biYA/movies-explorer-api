const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// роутеры :

// GET /movies возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// POST /movies создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU, nameEN,thumbnail, movieId
router.post('/', createMovie);

// DELETE /movies/_id  удаляет сохранённый фильм по id.
router.delete('/:movieId', deleteMovie);

module.exports = router;

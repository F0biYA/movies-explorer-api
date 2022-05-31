const router = require('express').Router();

const { validateMovie, validateMovieId } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// роутеры :

// GET /movies возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// POST /movies создаёт фильм
router.post('/', validateMovie, createMovie);

// DELETE /movies/_id  удаляет сохранённый фильм по id.
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;

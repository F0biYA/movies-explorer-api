// импорт модели карточек
const Movie = require('../models/movie');

// импорт ошибок (400, 404, 403)
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

// все фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => next(err));
};

// создать фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner,
    nameRU,
    nameEN,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
// удалить фильм
module.exports.deleteMovie = (req, res, next) => {
  const id = req.params.cardId;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найден'));
      } else if (String(movie.owner) === req.user._id) {
        Movie.findByIdAndRemove(id)
          .then(() => res.status(200).send({ message: 'Фильм удален' }))
          .catch(() => next(new NotFoundError('Фильм не найден')));
      } else {
        throw new ForbiddenError('Нет прав для удаление данного фильма');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

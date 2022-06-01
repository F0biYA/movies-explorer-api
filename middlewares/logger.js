const winston = require('winston');
const expressWinston = require('express-winston');

/* создать логгер запросов */
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

/* создать логгер ошибок */
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

/* экспорт обоих логгеров */
module.exports = {
  requestLogger,
  errorLogger,
};

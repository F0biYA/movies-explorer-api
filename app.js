const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
require('dotenv').config();

const { MONGO_URL, PORT } = require('./utils/constants');

const app = express();

// подключаю mongo
mongoose.connect(MONGO_URL);

/* импорт логгеров */
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* импорт ошибок */
const handleError = require('./middlewares/handleError');

/* обработка HTTP POST запросов, перевод данных в json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* запуск до всех обработчиков роутов */
app.use(requestLogger);

/* Массив доменов, с которых разрешены кросс-доменные запросы */
const allowedCors = [
  'http://localhost:3000',
  'http://putilin.student.nomoredomains.xyz',
  'https://putilin.student.nomoredomains.xyz',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  if (allowedCors.includes(origin)) { // проверяем, что источник запроса есть среди разрешённых
    res.header('Access-Control-Allow-Origin', origin); // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

// /* Краш-тест сервера  */
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);

/* запуск логгера ошибок после обработчиков роутов и до обработчиков ошибок */
app.use(errorLogger);

/* обработчик ошибок celebrate */
app.use(errors());

/* все не пойманные ошибки приводим к ошибке сервера 500 */
app.use(handleError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // name — имя пользователя. Это обязательное поле-строка от 2 до 30 символов.
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // email — почта пользователя,обязательное поле. должно валидироваться
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат email',
    },
  },
  // password хеш пароля. Обязательное поле-строка
  password: {
    type: String,
    required: true,
    select: false,
  },
});
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // пользователь не найден — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};
// экспорт схемы пользователя
module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');
const validation = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validation.isEmail(v);
      },
      message: 'Email невалиден',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
  name: {
    type: String,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        const regex = /https?:\/\/[w{3}.]?[\S^а-яё]/gi; // ? экранируем оба слэша. далее к пути: получается, что \S ищет вообще все, кроме пробелов. значит, он нам подходит для поиска цифр, латинских букв и разных символов. но нам не нужны кириллические буквы. значит, мы их исключаем с помощью карета.
        return regex.test(v);
      },
      message: 'Ссылка на аватар недействительна!',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userSchema);

// TODO написать регулярку для функции валидации ссылок - done
// TODO написать функцию валидации ссылок - done
// TODO разобраться с лайками - done
// TODO разобраться с createdAt - done

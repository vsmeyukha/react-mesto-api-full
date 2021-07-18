const jwt = require('jsonwebtoken');
const NotFoundUserError = require('../errors/notFoundUserError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new NotFoundUserError('Необходимо авторизоваться'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'very-secret-key');
  } catch (err) {
    return next(new NotFoundUserError('Неверный токен'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };

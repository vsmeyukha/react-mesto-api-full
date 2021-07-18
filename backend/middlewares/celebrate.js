const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('неправильный ID');
    }),
  }),
});

const userInfo = {
  name: Joi.string().max(30),
  about: Joi.string().max(30),
  avatar: Joi.string().pattern(/https?:\/\/[w{3}.]?[\S^а-яё]/),
};

const EmailAndPassword = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
};

const validateUserInfo = celebrate({
  body: Joi.object().keys(userInfo),
});

const validateEmailAndPassword = celebrate({
  body: Joi.object().keys(EmailAndPassword),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({ ...userInfo, ...EmailAndPassword }),
});

const validateCardInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/https?:\/\/[w{3}.]?[\S^а-яё]/),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('неправильный ID');
    }),
  }),
});

module.exports = {
  validateUserId,
  validateUserInfo,
  validateEmailAndPassword,
  validateCardInfo,
  validateCardId,
  validateRegistration,
};

const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const CastError = require('../errors/castError');
const NotYourCardError = require('../errors/notYourCardError');

// ! возвращаем все карточки
const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const ownerID = req.user._id;
  console.log(`ownerID: ${ownerID}`);
  console.log(`req.user: ${req.user}`);

  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Нет такой карточки'))
    .then((card) => {
      console.log(`card.owner: ${card.owner}`);
      console.log(`card: ${card}`);
      console.log(`typeof card.owner: ${typeof card.owner}`);
      console.log(`typeof card.owner toString: ${typeof String(card.owner)}`);
      if (String(card.owner) !== ownerID) {
        throw new NotYourCardError('НЕ покушайся на чужую карточку');
      }
      card.deleteOne();
      return res.status(200).send({
        message: 'Карточка успешно удалена',
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Вы прислали странный запрос'));
      }
      return next(err);
    });
};

const createCard = (req, res, next) => {
  console.log(req.user);
  console.log(req.query);
  const ownerId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError('Вы не заполнили обязательные поля'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(new NotFoundError('Нет такой карточки'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new CastError('ID карточки странноват'));
    }
    return next(err);
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(new NotFoundError('Нет такой карточки'))
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new CastError('ID карточки странноват'));
    }
    return next(err);
  });

module.exports = {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
};

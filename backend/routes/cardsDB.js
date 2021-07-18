const router = require('express').Router();
const { validateCardInfo, validateCardId } = require('../middlewares/celebrate');

const {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsDB');

router.get('/cards', getAllCards);

router.post('/cards', validateCardInfo, createCard);

router.delete('/cards/:cardId', validateCardId, deleteCard);

router.put('/cards/:cardId/likes', validateCardId, likeCard);

router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;

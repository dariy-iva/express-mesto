const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .custom((value) => {
          if (!isURL(value, { require_protocol: true })) {
            throw new Error('Неправильный формат ссылки');
          }
          return value;
        }),
    }),
  }),
  createCard,
);
router.get('/', getCards);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteCard,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  dislikeCard,
);

module.exports = router;

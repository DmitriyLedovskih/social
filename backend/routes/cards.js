const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
} = require('../../controllers/cards');
const { regex } = require('../../utils/constants');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    image: Joi.string().required().regex(regex),
    descr: Joi.string().required(),
  }),
}), createCard);

module.exports = router;

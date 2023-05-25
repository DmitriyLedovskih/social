const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getMe,
  logout,
} = require('../controllers/users');
const { regex } = require('../utils/constants');
const auth = require('../middlewares/auth');

router.get('/', getUsers);

router.get('/me', auth, getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);

module.exports = router;

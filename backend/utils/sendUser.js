const NotFoundError = require('../errors/NotFoundError');
const { OK_STATUS } = require('./constants');

module.exports = function sendUser(res, data) {
  if (!data) {
    throw new NotFoundError('Пользователь не найдены');
  }

  res.status(OK_STATUS).send(data);
};

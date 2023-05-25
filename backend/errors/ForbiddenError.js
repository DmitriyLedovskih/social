const { FORBIDDEN_ERROR_STATUS } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_STATUS;
  }
}

module.exports = ForbiddenError;

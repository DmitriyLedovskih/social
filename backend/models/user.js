const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Укажите ваше имя'],
  },
  lastname: {
    type: String,
    required: [true, 'Укажите вашу фамилию'],
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Укажите вашу почту'],
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Email некорректный',
    },
  },
  password: {
    type: String,
    required: [true, 'Укажите ваш пароль'],
    select: false,
  },
}, { versionKey: false, toJSON: { useProjection: true }, toObject: { useProjection: true } });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почтам или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почтам или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  descr: {
    type: String,
    required: [true, 'Поле "descr" должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);

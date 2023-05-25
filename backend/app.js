require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const error = require('./middlewares/error');
const router = require('./routes');
const cors = require('cors');

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/socialdb');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());

app.use(router);

app.use(errors());
app.use(error);
app.listen(PORT);

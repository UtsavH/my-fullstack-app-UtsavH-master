import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';  // Correctly import once
import logger from 'morgan';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import indexRouter from './routes/index.js';
import apiRouter from './routes/api/index.js';
import usersRouter from './routes/api/users.js';
import booksRouter from './routes/api/books.js';

var app = express();

const __filename = fileURLToPath(import.meta.url); // Get the resolved path to the file
const __dirname = path.dirname(__filename); // Get the name of the directory

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.log(`Error: unable to connect. ${err.message}`);
  });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  // This should be placed before routes
app.use(express.static(path.join(__dirname, 'client/dist')));

// Use routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;

// var createError = require('http-errors');
import createError from 'http-errors';
// var express = require('express');
import express from 'express';
// var path = require('path');
import path from 'path';
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// var logger = require('morgan');
import logger from 'morgan';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

//connect to our mongodb instance
mongoose.connect(process.env.MONGO_DB).then(()=>{
  console.log('Database connecetd successfully')
}).catch( err =>{
  console.log(`Error: unable to connect. ${err.message}`)
})
//var indexRouter = require('./routes/index');
import indexRouter from './routes/index.js';
// var usersRouter = require('./routes/users');
import usersRouter from './routes/users.js';
//books router
import booksRouter from './routes/books.js';
import { log } from 'console';

var app = express();

const __filename= fileURLToPath(import.meta.url); //get the resolved path to the file
const __dirname= path.dirname(__filename); //get the name of the directory

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books',booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;

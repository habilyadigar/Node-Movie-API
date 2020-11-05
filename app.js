const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
//config
const config = require('./config');



//midleware
const verifyToken = require('./middleware/verify-token')



const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const director = require('./routes/director');

const app = express();
mongoose.connect('mongodb://localhost/Filmoloji',{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('Mongodb bağlantı sağlandı');
  })
  .catch((err)=>{
    console.log(err+'mongodb bağlantı hatası!!!');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//config
app.set('api_secret_key',config.api_secret_key);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api',verifyToken);
app.use('/api/movie', movie);
app.use('/api/directors', director);




// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

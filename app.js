// express
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const userRoute = require('./routes/UserRoutes');
const postRoute = require('./routes/PostRoutes');
const commentRoute = require('./routes/CommentRoute');
const viewRoute = require('./routes/viewRoute');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Middleware
//static serving
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Routes
app.use('/', viewRoute);

app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', commentRoute);

module.exports = app;

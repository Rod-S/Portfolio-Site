const express = require('express');
const path = require('path');
const app = express();
const data = require('./data.json');
const projects = data;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.locals = data;
  res.render('index', res.locals);
  console.log(res.locals);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/project/:id', (req, res) => {
  res.locals = data.projects[0];
  res.render('project');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(( err, req, res, next ) => {
  res.locals.error = err;
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else
    res.status(500);
  res.render('error');
});


app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});

const express = require('express');
const path = require('path');
const app = express();
const data = require('./data.json');
const projects = data.projects;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.locals = data.projects;
  res.render('index', res.locals);
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});

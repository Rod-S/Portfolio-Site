//require necessary dependencies
const express = require('express');
const app = express();
const data = require('./data.json');

//setup static route to serve static files in public folder
app.use('/static', express.static('public'));

//set view engine to read pug files in view folder
app.set('view engine', 'pug');

//route to home webpage, rendering index.pug
app.get('/', (req, res) => {
  const { projects } =  data;
  res.locals = projects;
  res.render('index', {projects});
});

//route to about page, rendering about.pug
app.get('/about', (req, res) => {
  res.render('about');
});

//route to individual project pages from index route; render project.pug
app.get('/project/:id', (req, res, next) => {
  const {id} = req.params;
  res.locals = data.projects[id];
  if ( 0 >= id || id < data.projects.length) {
    res.render('project');
  } else {
    next();
  }
});

//setup error middleware, passing in new error object
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.locals = data.projects;
  next(err);
});

//render status error page rendering error.pug
app.use(( err, req, res, next ) => {
  res.locals.error = err;
  //display specific error statuses depending on code
  if (err.status >= 100 && err.status < 600)
    res.status(err.status);
  else
    res.status(500);
  console.log('There was an error while loading the page');
  res.render('error');
});

//start server on localhost port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

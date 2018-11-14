const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//MIDDLEWARE-------------------------------------------
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to server.log.');
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
//-----------------------------------------------------
//RENDERING BELOW
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!<h1>');
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to Our Site',
    pageTitle: 'Main Page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    welcomeMessage: 'About',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errormessage: 'Unable to handle the request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});

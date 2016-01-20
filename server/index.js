var express = require('express');
var path = require('path');
var chalk = require('chalk');
var db = require('../server/db');
var Frog = db.models.Frog;

var app = express();

app.use(express.static(path.join(__dirname, '../node_modules')));
app.use('/client', express.static(path.join(__dirname, '../client')));

app.set('view engine', 'jade');

app.get('/', function(req, res, next){
  res.render('index', {rnd: Math.random() * 100});
});

app.get('/api/frogs', function(req, res, next){
  Frog.findAll()
    .then(function(frogs){
      res.send(frogs);
    }, function(err){
      err.json = true;
      next(err);
    });
});

app.use(function(error, req, res, next){
  console.log(chalk.red(error.message));
  if(!error.json)
    res.render('index', {rnd: Math.random() * 100, error: error.message });
  else
    res.sendStatus(500, error);
});


var port = process.env.PORT || 3000;

console.log('app starting on port ' + port);

db.connect()
  .then(function(){
    console.log(chalk.green('connected to db'));
    console.log(process.env.NODE_ENV);
    app.listen(port);
  })
  .catch(function(error){
    console.log(error.message);
    process.exit(1);
  });


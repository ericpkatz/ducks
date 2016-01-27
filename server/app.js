var express = require('express');
var path = require('path');
var chalk = require('chalk');
var app = express();
var db = require('../server/db');
var Frog = db.models.Frog;
var bodyParser = require('body-parser');

module.exports = app;

app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, '../client')));

app.set('view engine', 'jade');

app.get('/', function(req, res, next){
  res.render('index', {rnd: Math.random() * 100});
});

app.get('/api/frogs/:id', function(req, res, next){
  Frog.findById(req.params.id)
    .then(function(frog){
      res.send(frog);
    }, function(err){
      err.json = true;
      next(err);
    });
});

app.put('/api/frogs/:id', function(req, res, next){
  Frog.findById(req.params.id)
    .then(function(frog){
      frog.firstName = req.body.firstName;
      return frog.save();
      res.send(frog);
    })
    .then(function(frog){
      res.send(frog);
    }, function(err){
      err.json = true;
      next(err);
    });
});

app.get('/api/frogs', function(req, res, next){
  Frog.queryByPage(0)
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

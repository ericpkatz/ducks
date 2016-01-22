var express = require('express');
var path = require('path');
var chalk = require('chalk');
var app = express();
var db = require('../server/db');
var Frog = db.models.Frog;

module.exports = app;

app.use(express.static(path.join(__dirname, '../node_modules')));
app.use('/client', express.static(path.join(__dirname, '../client')));

app.set('view engine', 'jade');

app.get('/', function(req, res, next){
  res.render('index', {rnd: Math.random() * 100});
});

app.get('/api/frogs/:pageIndex?', function(req, res, next){
  var pageIndex = req.params.pageIndex || 0;
  Frog.queryByPage(pageIndex)
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

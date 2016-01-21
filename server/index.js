var express = require('express');
var path = require('path');
var chalk = require('chalk');
var db = require('../server/db');
var Frog = db.models.Frog;

var app = require('./app');


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


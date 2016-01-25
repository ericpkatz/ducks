var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./gulp.config.js');
var argv = require('yargs').argv;
var chalk = require('chalk');
var db = require('./server/db');
var faker = require('faker');
var Promise = require('bluebird');

var browserSync = require('browser-sync');

gulp.task('seed', function(){
  return db.sync()
    .then(function(){
      var users = [];
      for(var i = 1; i < 10000; i++){
        users.push({
          firstName : faker.name.firstName(),
          lastName : faker.name.lastName(),
          state : faker.address.state()
        }); 
      }
      var inserts = users.map(function(user){
        return db.models.Frog.create(user);
      });
      return Promise.all(inserts)
        .then(function(){
          console.log('done');
        });
    });
});

gulp.task('inject', function(){
  var inject = require('gulp-inject');
  var print = require('gulp-print');
  var target = gulp.src('./views/index.jade');
  var sources = gulp.src(['./client/app/app.js', './client/app/**/*.js']);
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./views'));

});

var _error = false;
gulp.task('dev-server', ['inject'], function(){
  nodemon({
    script: 'server/index.js',
    env: {
      PORT: config.port,
      NODE_ENV: 'dev'
    }
  })
  .on('start', function(){
    _error = false;
    if(!argv.nosync)
      startBrowserfy();
    console.log(chalk.green('nodemon is starting'));
  })
  .on('crash', function(ev){
    _error = true;
  })
  .on('restart', function(){
    _error = false;
    if(!argv.nosync){
      if(_error)
        return;
      setTimeout(function(){
        browserSync.reload(); 
      }, 1000);
    }
    console.log('nodemon is RE-starting');
  });
 
});

function startBrowserfy(){
  if(browserSync.active)
    return;
  setTimeout(function(){
    if(_error)
      return;
    browserSync({
      proxy: 'localhost:' + config.port,
      files: '**/*.*'
    });
  }, 1000);
}

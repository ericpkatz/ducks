var Promise = require('bluebird');
var Sequelize = require('sequelize');

var _db;

function db(){
    if(!_db)
      _db = new Sequelize('postgres://localhost/frog_db');
    return _db;
}
function connect(){
    return db().authenticate(); 
}
module.exports = {
  connect: connect, 
  models: {
    Frog: db().define('frog', {
      firstName: Sequelize.STRING, 
      lastName: Sequelize.STRING,
      state: Sequelize.STRING
    })
  },
  sync : function(){
    return connect()
      .then(function(){
        return db().sync({force: true});
      });
  }
};

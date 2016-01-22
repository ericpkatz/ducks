var db = require('../../server/db');
var app = require('../../server/app');
var request = require('supertest');
var faker = require('faker');
var _ = require('lodash');

describe('frogs', function(){

  beforeEach(function(done){
    db.sync()
      .then(function(){
        done();
      });
  });

  describe('there are 99 frogs', function(){
    var sortedFrogs, frogs;
    beforeEach(function(done){
      var frogs = [];
      for(var i = 1; i <= 99; i++){
        frogs.push({
          firstName : faker.name.firstName(),
          lastName : faker.name.lastName(),
          state : faker.address.state()
        }); 
      }
      var inserts = frogs.map(function(user){
        return db.models.Frog.create(user);
      });

      Promise.all(inserts)
        .then(function(records){
          sortedFrogs = _.orderBy(records, ['firstName']);
          done();
        });
    
    });

    describe('GET', function(){
      describe('without setting page index', function(){
        it('should return the first 20 frogs', function(done){
          request(app).get('/api/frogs')
            .end(function(err, resp){
              var frogs = resp.body;
              frogs.length.should.equal(20);
              frogs[0].firstName.should.equal(sortedFrogs[0].firstName);
              done();
            });
        });
      });

      describe('with setting page index', function(){
        it('should return the second 20 frogs', function(done){
          request(app).get('/api/frogs/1')
            .end(function(err, resp){
              var frogs = resp.body;
              frogs.length.should.equal(20);
              frogs[0].firstName.should.equal(sortedFrogs[20].firstName);
              done();
            });
        });
      });
    });
  });
});

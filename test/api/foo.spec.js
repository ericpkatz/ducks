var should = require('should');
var app = require('express')();
var request = require('supertest');

app.get('/foo/:count?', function(req, res){
  var count = req.params.count || 3;
  res.send(['foo', 'bar', 'bazz'].slice(0, count));
});

describe('calling foo', function(){
  describe('when asking for two items', function(){
    it('returns two items', function(done){
      request(app)
        .get('/foo/2')
        .end(function(err, resp){
          should.not.exist(err);
          resp.body.length.should.equal(2);
          done();
        });
    });
  });
  describe('when asking for one item', function(){
    it('returns one items', function(done){
      request(app)
        .get('/foo/1')
        .end(function(err, resp){
          should.not.exist(err);
          resp.body.length.should.equal(1);
          done();
        });
    });
  });
  describe('when not specifying', function(){
    it('returns three items', function(done){
      request(app)
        .get('/foo')
        .end(function(err, resp){
          should.not.exist(err);
          resp.body.length.should.equal(3);
          done();
        });
    });
  });
});

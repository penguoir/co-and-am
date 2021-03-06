var pouchdb = require('pouchdb')
var db = new pouchdb('caa')

var game = require('./../models/game')

describe('Database', function() {
  it('should be active', function(done) {
    db.info()
      .then(data => {
        expect(data).toBeDefined();
        done();
      })
      .catch(err => {
        throw err;
        done();
      })
  });
});

describe('Game Model', function () {
  var id;

  it('should create a game and return an id', function (done) {
    game.create().then(gid => {
      id = gid;
      expect(id).toBeDefined();
      done();
    }).catch(err => {
      throw err;
      done();
    })
  });

  it('should give a non-repeating role object', function(done) {
    game.getRole(id).then(data => {
      expect(data).toBeDefined();
      done();
    }).catch(err => {
      throw err;
      done();
    })
  });

  it('should check if a game is valid', function(done) {
    game.isValid(id).then(res => {
      expect(res).toBe(true);
      done();
    }).catch(err => {
      throw err;
      done();
    })
  });

  it('should check if a game is invalid', function(done) {
    game.isValid('foo').then(res => {
      expect(res).not.toBe(true);
      done();
    }).catch(err => {
      expect(err).toBe(false)
      done();
    })
  });

  it('should delete a game', function (done) {
    game.remove(id).then(res => {
      expect(res).toBeDefined();
      done();
    }).catch(err => {
      throw err;
      done();
    })
  });
});

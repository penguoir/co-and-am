var pouchdb = require('pouchdb')
var db = new pouchdb('caa')

var Game = function () {}

Game.prototype.create = function() {
  return new Promise(function(resolve, reject) {
    var id = Math.floor( Math.random() * 900000 ) + 100000
    db.put({
      _id: String(id),
      roles: [
        {
          top: 'communist',
          bottom: 'bomber'
        },
        {
          top: 'communist',
          bottom: 'team only'
        },
        {
          top: 'communist',
          bottom: 'spy'
        },
        {
          top: 'american',
          bottom: 'president'
        },
        {
          top: 'american',
          bottom: 'team only'
        },
        {
          top: 'american',
          bottom: 'spy'
        },
      ]
    }).then( res => resolve(id))
      .catch(err => reject(err))
  })
}

Game.prototype.getRole = function(id) {
  return new Promise(function(resolve, reject) {
    if (!id) reject('Param id must be given.')
    db.get(String(id)).then(doc => {
      var roles = doc.roles
      var rnd = Math.floor( Math.random() * roles.length)
      var selected = roles[rnd]
      roles.splice(rnd, 1)

      resolve(selected)

      db.put({
        _id: String(id),
        _rev: doc._rev,
        roles: roles
      }).catch(err => reject(err))
    }).catch(err => reject(err))
  });
}

Game.prototype.remove = function(id) {
  return new Promise(function(resolve, reject) {
    db.get(String(id))
      .then(doc => db.remove(doc))
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

Game.prototype.isValid = function(id) {
  return new Promise(function(resolve, reject) {
    db.get(String(id))
      .then(doc => resolve(true))
      .catch(err => reject(false))
  })
}

module.exports = new Game()

var express = require('express')
var game = require('../models/game')
var router = express.Router()

router.get('/', function(req, res) {
  res.status(201)
  game.create().then(id => {
    res.redirect('g/' + id + '/')
  })
})

router.get('/:id/', function(req, res) {
  var id = decodeURIComponent(req.params.id)
  game.isValid(String(id)).then(isValid => {
    if (isValid) {
      res.status(200)
      res.render('lobby', {id: id})
    }
  }).catch(err => {
    res.status(404)
    res.render('error', {
      message: 'We couldn\'t find that game!',
      helper: 'Make sure you copied the correct game id. Don\'t let any number slide!'
    })
  })
})

router.get('/:id/card', function(req, res) {
  var id = decodeURIComponent(req.params.id);
  game.isValid(String(id)).then(isValid => {
    if (isValid) {
      res.status(200)
      game.getRole(id).then(role => {
        res.render('card', {
          top: role.top,
          bottom: role.bottom
        })
      }).catch(err => {
        res.render('error', {
          message: 'Sorry! This game is full.',
          helper: 'Don\'t worry! You can make your own game! (This sometimes happens when someone accidentally refreshes their page. Solution coming soon!)'
        })
      })
    }
  })
})

module.exports = router;

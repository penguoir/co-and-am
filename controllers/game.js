var express = require('express')
var game = require('../models/game')
var router = express.Router()

router.get('/', function(req, res) {
  res.status(201)
  if (req.query.playerNum) {
    game.create(req.query.playerNum).then(id => {
      res.redirect('g/' + id + '/')
    })
  } else {
    res.render('create')
  }
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
      if (req.cookies.card && req.cookies.card.id === id) {
        res.render('card', {
          top: req.cookies.card.top,
          bottom: req.cookies.card.bottom
        })
      } else {
        game.getRole(id).then(role => {
          res.cookie('card', {
            id: id,
            top: role.top,
            bottom: role.bottom
          }).render('card', {
            top: role.top,
            bottom: role.bottom
          })
        }).catch(err => {
          res.render('error', {
            message: 'Sorry! This game is full.',
            helper: 'Don\'t worry! You can make your own game!'
          })
        })
      }
    }
  })
})

module.exports = router;

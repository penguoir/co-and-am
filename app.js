var express = require('express');

var app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(require('./controllers'))
app.use(express.static(__dirname + '/public'))

// 404 redirect
app.use(function(req, res, next) {
  res.status(404)

  if (req.accepts('html')) {
    res.render('error', {
      message: 'We couldn\'t find that page!',
      helper: 'Make sure you\'ve got the right link!'
    })
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    res.end()
    return;
  }

  res.type('txt').send('404, not found')
})

exports.server = app.listen(process.env.PORT || 8080)

exports.close = function() {
  this.server.close()
}

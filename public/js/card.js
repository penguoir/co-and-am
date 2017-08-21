$('h3').first().data('text', $('h3').first().text())
$('h3').last().data('text', $('h3').last().text())

function rnd(l = 10) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < l; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

$('h3').on('click', function (e) {
  if ( $(this).hasClass('hide') ) {
    $(this).text( $(this).data('text') )
    $(this).removeClass('hide')
  } else {
    $(this).addClass('hide')
  }
});

setInterval(function() {
  $('.hide').first().text( rnd(10) )
  $('.hide').last().text( rnd(10) )
}, 1)

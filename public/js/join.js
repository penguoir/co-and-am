$('.btn').click(function(e) {
  e.preventDefault()
  window.location.pathname = 'g/' + $('#gid').val() + '/'
})

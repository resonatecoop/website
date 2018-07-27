var halftone = require('./lib/halftone')
var manifesto = require('./modules/manifesto')
var stickyscroll = require('./modules/stickyscroll')
var smoothscroll = require('./modules/smoothscroll')

if ($('.ht-img-horz').length > 0) {
  halftone()
  manifesto()
}
stickyscroll()
smoothscroll()

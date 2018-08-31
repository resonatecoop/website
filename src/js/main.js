var halftone = require('./lib/halftone')
var tge = require('./modules/tge')
var manifesto = require('./modules/manifesto')
//var stickyscroll = require('./modules/stickyscroll')
//var smoothscroll = require('./modules/smoothscroll')

if ($('.ht-img-horz').length > 0) {
  halftone()
  manifesto()
}
if ($('.ht-img-tge').length > 0) {
  halftone()
  tge()
}

//stickyscroll()
//smoothscroll()

/*var endDate = new Date('November 17, 2018 03:24:00');

var timerId =
  countdown(
    endDate,
    function(ts) {
      document.getElementById('countdownDays').innerHTML = ts.days.toString()
      document.getElementById('countdownHours').innerHTML = ts.hours.toString()
      document.getElementById('countdownMinutes').innerHTML = ts.minutes.toString()
      document.getElementById('countdownSeconds').innerHTML = ts.seconds.toString()
      if ($('#countdownDaysFoot').length > 0) {
        document.getElementById('countdownDaysFoot').innerHTML = ts.days.toString()
      }
      if ($('#countdownHoursFoot').length > 0) {
        document.getElementById('countdownHoursFoot').innerHTML = ts.hours.toString()
      }
      if ($('#countdownMinutesFoot').length > 0) {
        document.getElementById('countdownMinutesFoot').innerHTML = ts.minutes.toString()
      }
      if ($('#countdownSecondsFoot').length > 0) {
        document.getElementById('countdownSecondsFoot').innerHTML = ts.seconds.toString()
      }

      function wrap_letters($element) {
          for (var i = 0; i < $element.childNodes.length; i++) {
              var $child = $element.childNodes[i];

              if ($child.nodeType === Node.TEXT_NODE) {
                  var $wrapper = document.createDocumentFragment();

                  for (var i = 0; i < $child.nodeValue.length; i++) {
                      var $char = document.createElement('span');
                      $char.className = 'char';
                      $char.textContent = $child.nodeValue.charAt(i);

                      $wrapper.appendChild($char);
                  }

                  $element.replaceChild($wrapper, $child);
              } else if ($child.nodeType === Node.ELEMENT_NODE) {
                  wrap_letters($child);
              }
          }
      }

      wrap_letters(document.querySelectorAll('.monospace')[0])
      wrap_letters(document.querySelectorAll('.monospace')[1])
      wrap_letters(document.querySelectorAll('.monospace')[2])
      wrap_letters(document.querySelectorAll('.monospace')[3])
    },
    countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);*/

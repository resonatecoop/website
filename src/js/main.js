var halftone = require('./lib/halftone')

var manifesto = require('./modules/manifesto')


halftone()

manifesto()

// init scrollmagic controller
var controller = new ScrollMagic.Controller()

// home page
function setHomeHeight() {
  homeParagraphsHeight = $("#home-paragraphs").height()
  actualHeight = homeParagraphsHeight - 360
}
setHomeHeight()
window.onresize = function() {
  setHomeHeight()
}
function getHomeHeight() {
  return actualHeight
}

new ScrollMagic.Scene({
    triggerElement: '#home-paragraphs',
		duration: getHomeHeight
	})
	.setPin("#join-sidebar") // pins the element for the the scene's duration
  //.addIndicators()
	.addTo(controller); // assign the scene to the controller

// main nav stick
new ScrollMagic.Scene({
    triggerElement: '#site-wrap',
		triggerHook: 0,
    offset: 600
	})
  .setClassToggle("#sticky-nav", "sticky")
  //.addIndicators()
	.addTo(controller);

// main nav opacity
new ScrollMagic.Scene({
    triggerElement: '#site-wrap',
		triggerHook: 0,
    offset: 100
	})
  .setClassToggle("#sticky-nav", "mainnav-opacity")
  //.addIndicators()
	.addTo(controller);

// sticky nav opacity
/*new ScrollMagic.Scene({
    triggerElement: '#site-wrap',
		triggerHook: 0,
    offset: 600
	})
  .setClassToggle("#sticky-nav", "stickynav-opacity")
  .addIndicators()
	.addTo(controller);*/

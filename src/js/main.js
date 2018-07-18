var halftone = require('./lib/halftone');

var manifesto = require('./modules/manifesto');


halftone();

manifesto();

// init controller
//var controller = new ScrollMagic.Controller({addIndicators: true});
var controller = new ScrollMagic.Controller();
var homeParagraphsHeight = $("#home-paragraphs").height();
var actualHeight = homeParagraphsHeight - 280

// create a scene
new ScrollMagic.Scene({
    triggerElement: '#home-paragraphs',
		duration: actualHeight
	})
	.setPin("#join-sidebar") // pins the element for the the scene's duration
  //.addIndicators()
	.addTo(controller); // assign the scene to the controller

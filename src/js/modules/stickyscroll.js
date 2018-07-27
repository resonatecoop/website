module.exports = function () {
    // init scrollmagic controller
    var controller = new ScrollMagic.Controller()

    // main nav stick
    new ScrollMagic.Scene({
        triggerElement: '#site-wrap',
    		triggerHook: 0,
        offset: 600
    	})
      .setClassToggle("#sticky-nav", "visible")
      //.addIndicators()
    	.addTo(controller);

    // sticky sidebar
    if ($('#scroll-trigger').length > 0) {
      function setHeights() {
        triggerHeight = $("#scroll-trigger").height()
        stickySidebarHeight = $("#sticky-sidebar").height()
        scrollHeight = triggerHeight - stickySidebarHeight
      }
      setHeights()
      window.onresize = function() {
        setHeights()
      }
      function getHeights() {
        return scrollHeight
      }
      new ScrollMagic.Scene({
          triggerElement: '#scroll-trigger',
      		duration: getHeights
      	})
      	.setPin("#sticky-sidebar")
        //.addIndicators()
      	.addTo(controller);
    }
}

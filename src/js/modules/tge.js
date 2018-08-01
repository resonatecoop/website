module.exports = function () {

  $(document).ready(function() {

    var img = document.querySelector('.ht-img-tge');

    $('.ht-img-tge').width($(window).width());

    // init halftone
    new BreathingHalftone( img, {
      // ----- dot size ----- //

      dotSize: 1/80,
      // size of dots
      // as a fraction of the diagonal of the image
      // smaller dots = more dots = poorer performance

      dotSizeThreshold: 0.02,
      // hides dots that are smaller than a percentage

      initVelocity: 0.12,
      // speed at which dots initially grow

      oscPeriod: 4,
      // duration in seconds of a cycle of dot size oscilliation or 'breathing'

      oscAmplitude: 0.5,
      // percentage of change of oscillation

      // ----- color & layout ----- //

      isAdditive: false,
      // additive is black with RGB dots,
      // subtractive is white with CMK dots

      isRadial: true,
      // enables radial grid layout

      channels: [ 'red', 'green', 'blue' ],
      // layers of dots
      // 'lum' is another supported channel, for luminosity

      isChannelLens: true,
      // disables changing size of dots when displaced

      // ----- behavior ----- //

      friction: 0.3,
      // lower makes dots easier to move, higher makes it harder

      hoverDiameter: 0.15,
      // size of hover effect
      // as a fraction of the diagonal of the image

      hoverForce: 0.03,
      // amount of force of hover effect
      // negative values pull dots in, positive push out

      activeDiameter: 0.9,
      // size of click/tap effect
      // as a fraction of the diagonal of the image

      activeForce: 0
      // amount of force of hover effect
      // negative values pull dots in, positive push out
    });

  });
}

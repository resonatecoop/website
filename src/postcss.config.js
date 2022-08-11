module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')({
      stage: 1,
      features: {
        browsers: ['last 1 version'],
        'custom-media-queries': {
          preserve: true,
        },
        'nesting-rules': true
      }
    })
  ]
}

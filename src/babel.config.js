module.exports = {
  presets: [
    [
      require('@babel/preset-env'),
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins: ['module:nanohtml']
}

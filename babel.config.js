module.exports = {
  presets: [
    [
      // Latest stable ECMAScript features
      '@babel/preset-env',
      {
        targets: {
          chrome: '49',
          firefox: '52',
          opera: '36',
          edge: '79'
        }
      }
    ]
  ],
  plugins: [
    // Some transforms (such as object-rest-spread)
    // don't work without it: https://github.com/babel/babel/issues/7215
    ['@babel/plugin-transform-destructuring', { useBuiltIns: true }],
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    [
      // Polyfills the runtime needed for async/await and generators
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true
      }
    ]
  ]
}

module.exports = {
  plugins: [
    require('postcss-custom-media')({
      importFrom: [
        './tailwind.config.js',
      ]
    }),
    require('postcss-easy-import')({}),
    require('postcss-normalize')({}),
    require('postcss-preset-env')({
      stage: 0,
    }),
    require('postcss-extend')({}),
    require('tailwindcss')('./tailwind.config.js'),
  ],
}
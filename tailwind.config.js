/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        backgroundForBack: '#18171f',
        bgMain: '#24232c',
        tooWeak: '#f64a4a',
        weak: '#fb7c58',
        medium: '#f8cd65',
        strong: '#a4ffaf',
        textColor: '#817d92',
        secondaryText: '#e6e5ea',
    },
  },
  plugins: [
    require('autoprefixer'),
  ],
}
}
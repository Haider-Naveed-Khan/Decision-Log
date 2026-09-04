/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#252837',
        periwinkle: '#8294C4',
        lavender: '#ACB1D6',
        mist: '#DBDFEA',
        peach: '#FFEAD2',
        canvas: '#FAFAF8',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Newsreader', 'Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
        mono: ['DM Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

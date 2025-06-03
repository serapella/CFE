// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        seafoam: 'hsl(var(--seafoam))',
        petrol: 'hsl(var(--petrol))',
        sunshine: 'hsl(var(--sunshine))',
        papaya: 'hsl(var(--papaya))',
        azure: 'hsl(var(--azure))',
        peony: 'hsl(var(--peony))',
        peacock: 'hsl(var(--peacock))',
        coral: 'hsl(var(--coral))',
      },
    },
  },
  plugins: [],
};
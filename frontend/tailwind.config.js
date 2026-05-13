module.exports = {
  presets: [
    require('frappe-ui/src/utils/tailwind.config')
  ],

  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: '#221a4d',
        secondary: '#1e40af',
        default: '#b2b2b2',
        background: '#f4f2ee',
        hoverbg: '#f3f3f3',
        highlight: '#275df5',
      },

      keyframes: {
        shimmer: {
          '0%': {
            transform: 'translateX(-150%)',
          },
          '100%': {
            transform: 'translateX(400%)',
          },
        },
      },

      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },

  plugins: [],
}
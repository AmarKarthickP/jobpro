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
      }
    },
  },
  plugins: [],
}

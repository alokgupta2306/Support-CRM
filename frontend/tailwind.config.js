/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'status-open': '#16A34A',
        'status-progress': '#D97706',
        'status-closed': '#64748B',
      },
    },
  },
  plugins: [],
}
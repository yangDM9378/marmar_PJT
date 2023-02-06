/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // text-brand는 앞으로 이 색으로 바뀜
        // '#6A79F8', '#427EF6'
        brand: '#427EF6',
        brandHover: '#6366f1',
      },
      fontFamily: {
        cafe24: ['Cafe24Ssurround', 'sans-serif'],
      },
      backgroundImage: {
        'video-bg': "url('/public/bg.jpg')",
        'main-bg': "url('/public/main-bg.png')",
        'logo-bg': "url('/public/logo.png')",
      },
    },
  },
  plugins: [],
};

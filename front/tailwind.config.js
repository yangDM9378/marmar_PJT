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
        'main-bg-1': "url('/public/main/bg-1.png')",
        'main-bg-2': "url('/public/main/bg-2.png')",
        'main-bg-3': "url('/public/main/bg-3.png')",
        'main-ft-1': "url('/public/main/footer-1.png')",
        'main-ft-2': "url('/public/main/footer-2.png')",
        'logo-bg': "url('/public/logo.png')",
        'info-header': "url('/public/info/info-header.jpg')",
      },
    },
  },
  plugins: [],
};

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
        flower: ['FlowerSalt', 'sans-serif'],
      },
      backgroundImage: {
        'video-bg': "url('/public/bg.jpg')",
        'main-bg': "url('/public/main-bg.png')",
        'logo-bg': "url('/public/logo.png')",
        'board-bg': "url('/public/img/background/board.png')",
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        '50%': '50%',
        '100%': '100%',
      },
      animation: {
        bounceleft: 'bounceleft 1s ease-in-out infinite',
        bounceright: 'bounceright 1s ease-in-out infinite',
        text: 'text 5s ease-in-out infinite',
      },
      keyframes: {
        bounceleft: {
          '0%, 100%': {
            transform: 'translateX(25%)',
            'animation-timing-function': 'cubic-bezier(0.5,0,5,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0.5,0.5,0.2,1)',
          },
        },
        bounceright: {
          '0%, 100%': {
            transform: 'translateX(-25%)',
            'animation-timing-function': 'cubic-bezier(0.5,0,5,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0.5,0.5,0.2,1)',
          },
        },
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};

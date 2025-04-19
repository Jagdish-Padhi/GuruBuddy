/** @type {import('tailwindcss').Config} */
export const content = ["./views/**/*.ejs", "./public/**/*.js"];
export const theme = {
  extend: {
    keyframes: {
      fadeInLeft: {
        '0%': { opacity: '0', transform: 'translateX(-30px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      fadeInRight: {
        '0%': { opacity: '0', transform: 'translateX(30px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
    animation: {
      'fade-in-left': 'fadeInLeft 0.6s ease-out',
      'fade-in-right': 'fadeInRight 0.6s ease-out',
      'fade-in-up': 'fadeInUp 0.6s ease-out',
    },
  },
};
export const plugins = [];

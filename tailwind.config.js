module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUpCustom: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.8) rotate(10deg)',
            backgroundColor: '#f0f0f0',
          },
          '50%': {
            opacity: '0.7',
            transform: 'translateY(-10px) scale(1.1) rotate(0deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1) rotate(0deg)',
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  },
  plugins: [],
};
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        brand: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
      },
      animation: {
        'float':           'float 5s ease-in-out infinite',
        'float-slow':      'float 7s ease-in-out 1s infinite',
        'float-delayed':   'float 5s ease-in-out 2.5s infinite',
        'float-delayed2':  'float 6s ease-in-out 1.5s infinite',
        'marquee':         'marquee 40s linear infinite',
        'marquee-reverse': 'marqueeReverse 40s linear infinite',
        'spin-slow':       'spin 14s linear infinite',
        'pulse-slow':      'pulse 3.5s ease-in-out infinite',
        'fade-in-up':      'fadeInUp 0.8s ease-out forwards',
        'fade-in':         'fadeIn 0.6s ease-out forwards',
        'ping-slow':       'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
        'shimmer':         'shimmer 2s linear infinite',
        'slide-in-right':  'slideInRight 0.5s ease-out forwards',
        'count-up':        'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

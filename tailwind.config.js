/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          soft: "#F5F5F2",
          surface: "#ECEDE8",
          surface2: "#F0F1ED",
          paleYellow: "#FFF0A8",
          paleYellowSoft: "#FFF9DB",
          yellowAccent: "#F5D64E",
          primary: "#202329",
          secondary: "#656A70",
          blue: "#1769D2",
          blueHover: "#1256B0",
          blueLight: "#EBF3FC",
          blueUltraLight: "#F4F8FD",
          border: "#E3E5E7",
          borderLight: "#EEF0F2",
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      boxShadow: {
        'apple-sm': '0 2px 8px -2px rgba(32, 35, 41, 0.04), 0 1px 3px -1px rgba(32, 35, 41, 0.02)',
        'apple-md': '0 8px 24px -4px rgba(32, 35, 41, 0.06), 0 2px 6px -1px rgba(32, 35, 41, 0.02)',
        'apple-lg': '0 20px 40px -12px rgba(32, 35, 41, 0.08), 0 4px 12px -2px rgba(32, 35, 41, 0.03)',
        'apple-hover': '0 16px 36px -8px rgba(23, 105, 210, 0.12), 0 4px 14px -2px rgba(32, 35, 41, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

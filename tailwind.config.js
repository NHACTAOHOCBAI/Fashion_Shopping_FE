// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          heading: "#333333", // hoặc black
          body: "#666666",
        },
        primary: {
          main: "#1A1A1A",
          dark: "#333333",
        },
        secondary: {
          border: "#A67C52",
        },
        background: {
          light: "#FFFFFF",
          gray: "#F5F6FA", // hoặc #F5F5F5 tùy tone
        },
        status: {
          error: "#FF4D4F",   // đỏ tươi
          success: "#52C41A", // xanh lá
        },
        accent: {
          pinkRed: "#FF6B6B",
          mintGreen: "#00C896",
          yellow: "#FFC300",
          blue: "#00AEFF",
        },
      },
      fontFamily: {
        heading: ['Montserrat'], // dùng cho title
        // Gán font Roboto làm mặc định cho sans
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],          // dùng cho nội dung
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        30: "30px",
        48: "48px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
        slideIn: "slideIn .8s ease-in-out",
        fadeUp: "fadeUp 1s ease-in-out",
      },
    },
  },
  // eslint-disable-next-line no-undef
  // plugins: [require("daisyui")],
};

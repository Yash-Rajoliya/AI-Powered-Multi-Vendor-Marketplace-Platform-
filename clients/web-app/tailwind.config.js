export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#1F2937",
        success: "#10B981",
        error: "#F43F5E",
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "gradient-main":
          "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
      },
    },
  },
  plugins: [],
};
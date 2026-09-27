/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f131d",
        surface: "#0f131d",
        "surface-dim": "#0f131d",
        "surface-bright": "#353944",
        "surface-variant": "#313540",
        "surface-container-lowest": "#0a0e18",
        "surface-container-low": "#171b26",
        "surface-container": "#1c1f2a",
        "surface-container-high": "#262a35",
        "surface-container-highest": "#313540",
        "on-surface": "#dfe2f1",
        "on-surface-variant": "#e9bcb6",
        "inverse-surface": "#dfe2f1",
        "inverse-on-surface": "#2c303b",
        outline: "#af8782",
        "outline-variant": "#5e3f3a",
        "surface-tint": "#ffb4a9",

        // Brand & Overrides
        "brand-neutral": "#0b0f19",
        "brand-primary": "#ee1515",
        "brand-secondary": "#facc15",
        "brand-tertiary": "#06b6d4",

        // Primary
        primary: "#ffb4a9",
        "on-primary": "#690002",
        "primary-container": "#ff5544",
        "on-primary-container": "#5c0001",
        "inverse-primary": "#c00008",
        "primary-fixed": "#ffdad5",
        "primary-fixed-dim": "#ffb4a9",
        "on-primary-fixed": "#410001",
        "on-primary-fixed-variant": "#930004",

        // Secondary
        secondary: "#ffe083",
        "on-secondary": "#3c2f00",
        "secondary-container": "#eec200",
        "on-secondary-container": "#645000",
        "secondary-fixed": "#ffe083",
        "secondary-fixed-dim": "#eec200",
        "on-secondary-fixed": "#231b00",
        "on-secondary-fixed-variant": "#574500",

        // Tertiary
        tertiary: "#4cd7f6",
        "on-tertiary": "#003640",
        "tertiary-container": "#009eb9",
        "on-tertiary-container": "#002f38",
        "tertiary-fixed": "#acedff",
        "tertiary-fixed-dim": "#4cd7f6",
        "on-tertiary-fixed": "#001f26",
        "on-tertiary-fixed-variant": "#004e5c",

        // Elements
        "element-fire": "#ef4444",
        "element-grass": "#10b981",
        "element-electric": "#facc15",
        "element-water": "#06b6d4",

        // Semantic alerts
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.25rem",
        gutter: "0.75rem",
        margin: "1rem",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        "display-lg": ["Sora", "sans-serif"],
        "headline-lg": ["Sora", "sans-serif"],
        "headline-sm": ["Sora", "sans-serif"],
        "label-badge": ["Sora", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "label-sm": ["Plus Jakarta Sans", "sans-serif"],
        "label-numeric": ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        tactile: "0 8px 24px rgba(0, 0, 0, 0.5)",
        "tactile-pressed": "inset 0 2px 4px rgba(0, 0, 0, 0.4)",
        "glow-primary": "0 0 20px rgba(238, 21, 21, 0.5)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.45)",
        "glow-gold": "0 0 20px rgba(250, 204, 21, 0.5)",
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.45)",
      },
      animation: {
        pulseSlow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      }
    },
  },
  plugins: [],
}

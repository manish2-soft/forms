/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                'ecomus-orange': '#ff6b35', // Typical Ecommerce Orange
                'ecomus-bg': '#f3f4f6',      // Light gray background
                'ecomus-sidebar': '#ffffff', // White sidebar
                'ecomus-text': '#1f2937',    // Dark gray text
                'ecomus-border': '#e5e7eb',  // Light border
                'ecomus-blue': '#4a90e2',
                'ecomus-green': '#10b981',
                'ecomus-red': '#ef4444',
                'ecomus-purple': '#8b5cf6',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.8s ease-in-out',
            }
        },
    },
    plugins: [],
}

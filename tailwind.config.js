/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                customPink: '#d53f8c',
                customBlack: '#2e2e2e',
                customWhite: '#fff',
            },
        },
    },
    plugins: [],
}
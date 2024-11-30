/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
  	extend: {
  		colors: {
  			background: '#1A1A1A',
  			primary: '#00FF00',
  			secondary: '#00FFFF',
  			text: {
  				DEFAULT: '#FFFFFF',
  				secondary: '#BFBFBF'
  			},
  			disabled: '#333333'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}


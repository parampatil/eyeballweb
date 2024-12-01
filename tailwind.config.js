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
  		},
  		animation: {
  			'shiny-text': 'shiny-text 8s infinite',
			'fade': 'fadeIn 3s ease-in-out',
  		},
  		keyframes: {
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			},
			'fadeIn': {
				from: { opacity: 0, transform: 'translateY(10px)' },
				to: { opacity: 1, transform: 'translateY(0)' },
			},
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}


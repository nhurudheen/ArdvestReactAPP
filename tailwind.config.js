/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      boxShadow: {
        custom: '-32px 0px 48px -20px rgba(0, 0, 0, 0.3)',
      },
      colors:{
          primary: '#218225',
          brandyellow: '#FEC844',
          dark_color:'#232931',
          dull_white :'#F4F4F4',
          grey_color : '#3F572A',
          border_color: '#D6D6D6'
      }
      
  }
  },
  plugins: [],
}


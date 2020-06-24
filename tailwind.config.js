module.exports = {
  purge: [],
  theme: {
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50%',
    },
    extend: {
      padding: {
        sm: '7px',
        md: '10px',
        lg: '20px',
      },
      borderRadius: {
        'large': '20px'
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'green': '#66c45f',
        'gray': '#63626a'
      }),
    },
    letterSpacing: {
      widest: '0.15625em',
    }   
  },
  variants: {},
  plugins: [],
}

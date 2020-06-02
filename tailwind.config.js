module.exports = {
  purge: [],
  theme: {
    inset: {
      '0': 0,
      auto: 'auto',
      '1/2': '50%',
    },
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'mint': '#BCFCE9'
    }),
    
  },
  variants: {},
  plugins: [],
}

module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  env: {
    node: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'camelcase': 0
  }
};
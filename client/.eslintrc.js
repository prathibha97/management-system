module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'default-param-last': 0,
    'react/no-array-index-key': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
  },
};

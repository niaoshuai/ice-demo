const { getESLintConfig } = require('@applint/spec');

// https://www.npmjs.com/package/@applint/spec
module.exports = getESLintConfig('react-ts', {
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
  },
});

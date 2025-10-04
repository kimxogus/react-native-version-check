const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({ baseDirectory: path.resolve(process.cwd()) });

const babelParser = require('@babel/eslint-parser');

module.exports = [
  // load recommended configs via compat
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ),

  // ignore files (replaces .eslintignore)
  { ignores: ['node_modules/**', 'build/**', 'docs/**', 'examples/**'] },

  // custom rules from previous .eslintrc
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'class-methods-use-this': 'off',
      'import/namespace': 'off',
      'import/no-namespace': 'off',
      'react-native/no-color-literals': 'off',
      'react/prop-types': 'off',
    },
  },
  // react settings
  {
    settings: {
      react: { version: 'detect' },
    },
  },
];

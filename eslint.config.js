const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

const compat = new FlatCompat({ baseDirectory: path.resolve(process.cwd()) });

// require the babel eslint parser. some installs export the parser on the `default`
// property (when transpiled as ESM), so fall back to `.default` when needed.
let babelParser = require('@babel/eslint-parser');

if (!babelParser || (!babelParser.parse && !babelParser.parseForESLint)) {
  // some builds export the parser as the `default` property (CJS interop).
  // prefer any available object that implements parseForESLint / parse.
  const maybe =
    babelParser && babelParser.default
      ? babelParser.default
      : require('@babel/eslint-parser');

  babelParser = maybe;
}

module.exports = [
  // ignore files (replaces .eslintignore) — put first so it's applied early
  // include both patterns to be explicit about possible path styles
  {
    ignores: [
      '**/node_modules/**',
      'node_modules/**',
      'build/**',
      'docs/**',
      'examples/**',
    ],
  },

  // load recommended configs via compat
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ),

  // custom rules from previous .eslintrc
  {
    languageOptions: {
      // use the babel parser object so ESLint can parse Flow/TypeScript-like syntax in source files
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

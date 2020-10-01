/* eslint-disable import/no-commonjs */
module.exports = {
  extends: ['aroundus/prettier', 'react-native'],
  plugins: ['react-native'],
  settings: {
    'class-methods-use-this': 'off',
    // https://github.com/facebook/react-native/issues/28549#issuecomment-622178649
    'import/ignore': ['react-native'],
    'import/namespace': 'off',
    'import/no-namespace': 'off',
    'import/no-commonjs': 'off',
    'react-native/no-color-literals': 'off',
  },
};

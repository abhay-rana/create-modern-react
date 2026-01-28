module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // TypeScript
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],

    // Import validation
    'import/no-unresolved': 'error',
    'import/named': 'error',

    // Core JavaScript
    'no-undef': ['error'],
    'no-var': ['error'],
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-duplicate-imports': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': 'error',

    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',

    // Disabled
    'no-extra-boolean-cast': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};

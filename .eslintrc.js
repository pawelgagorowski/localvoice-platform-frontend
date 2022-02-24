module.exports = {
  plugins: ["import"],
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        printWidth: 120,
        endOfLine: 'auto',
      },
    ],
    'vue/html-self-closing': ['off'],
    'no-var': 'error',
    'no-throw-literal': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
        node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            moduleDirectory: ['node_modules', 'src/'],
        },
    },
}
};

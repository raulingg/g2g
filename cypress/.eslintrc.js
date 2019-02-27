module.exports = {
  'extends': ['plugin:cypress/recommended', 'prettier'],
  env: {
    mocha: true,
    'cypress/globals': true
  },
  plugins: ['cypress', 'chai-friendly', 'prettier'],
  rules: {
    'no-console': 0,
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false
      }
    ]
  }
}

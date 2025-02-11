module.exports = {
  parser: '@typescript-eslint/parser', // Parses TypeScript syntax
  parserOptions: {
    project: 'tsconfig.json', // Points to your TypeScript configuration file
    tsconfigRootDir: __dirname, // Ensures the path to tsconfig.json is correct
    sourceType: 'module', // Allows the use of ES modules (import/export)
  },
  plugins: ['@typescript-eslint/eslint-plugin'], // Uses the TypeScript plugin for linting
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses recommended TypeScript linting rules
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  root: true, // Makes sure ESLint treats this as the root config
  env: {
    node: true, // Lints for Node.js environment
    jest: true, // Lints for Jest testing environment
  },
  ignorePatterns: ['.eslintrc.js'], // Ignores the ESLint config file itself
  rules: {
    'linebreak-style': ['error', 'unix'], // Enforces Unix-style linebreaks (LF)
    '@typescript-eslint/interface-name-prefix': 'off', // Disables interface name prefix rule (e.g., 'I' in interfaces)
    '@typescript-eslint/explicit-function-return-type': 'off', // Allows functions to not have an explicit return type
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disables explicit module boundary types (i.e., function argument/return types)
    '@typescript-eslint/no-explicit-any': 'off', // Allows the use of 'any' type in TypeScript
  },
};

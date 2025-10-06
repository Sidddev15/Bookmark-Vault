module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    env: { node: true, es2020: true },
    rules: {
        'import/order': ['error', { alphabetize: { order: 'asc' }, 'newlines-between': 'always' }]
    }
};

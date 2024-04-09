module.exports = {
    env: {
        node: true,
        commonjs: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'no-undef': 'off'
    },
    overrides: [
        {
            files: '*.graphql',
            extends: ['plugin:@graphql-eslint/operations-recommended'],
            plugins: ['@graphql-eslint']
        }
    ]
}

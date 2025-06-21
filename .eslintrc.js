// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: 'expo',
	ignorePatterns: ['*/dist/*', 'generate-swagger.js'],
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/object-curly-spacing': 'off',
				'arrow-parens': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/indent': 'off',
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/ban-types': 'off',
				'@typescript-eslint/prefer-ts-expect-error': 'off',
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/restrict-plus-operands': 'off',
				'react-hooks/exhaustive-deps': 'off',
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
				'no-mixed-spaces-and-tabs': 'off',
				'prettier/prettier': 'off',
				'no-await-in-loop': 'off',
				'new-cap': 'off',
				'@typescript-eslint/prefer-literal-enum-member': 'off',
				'@typescript-eslint/no-dynamic-delete': 'off',
				'no-extend-native': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'@typescript-eslint/consistent-type-assertions': 'off',
				'react/display-name': 'off',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						vars: 'all',
						args: 'after-used',
						ignoreRestSiblings: true,
						caughtErrors: 'none',
					},
				],
			},
		},
	],
};

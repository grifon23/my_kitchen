module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['@typescript-eslint', 'react', 'react-native'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-native/all',
	],
	rules: {
		'react-native/no-inline-styles': 0,
		'react-native/split-platform-components': 2,
		'react-native/no-raw-text': 2,
		'react-native/no-single-element-style-arrays': 2,
		'react-native/no-unused-styles': 'off',
		'react/jsx-key': 'off',
		'react/no-children-prop': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-raw-text': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-types': [
			'off',
			{
				extendDefaults: true,
				types: {
					'{}': false,
				},
			},
		],
	},
	overrides: [
		{
			files: ['*.ts', '*.mts', '*.cts', '*.tsx', '*.js'],
			rules: {
				'no-undef': 0,
				'@typescript-eslint/no-unused-vars': 'off',
				'react-native/no-color-literals': 'off',
				'react-native/sort-styles': 'off',
				'no-mixed-spaces-and-tabs': 'off',
				'react-native/no-raw-text': 'off',
				'@typescript-eslint/no-explicit-any': 1,
			},
		},
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['.eslintrc.js'],
}

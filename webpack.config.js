const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const postcssPlugins = require('@wordpress/postcss-plugins-preset');

const {
	hasPostCSSConfig,
} = require('./node_modules/@wordpress/scripts/utils');

const cssLoaders = [
	{
		loader: MiniCSSExtractPlugin.loader,
	},
	{
		loader: require.resolve('css-loader'),
		options: {
			sourceMap: !isProduction,
		},
	},
	{
		loader: require.resolve('postcss-loader'),
		options: {
			// Provide a fallback configuration if there's not
			// one explicitly available in the project.
			...(!hasPostCSSConfig() && {
				ident: 'postcss',
				plugins: postcssPlugins,
			}),
		},
	},
];

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(sc|sa)ss$/,
				include: [
					path.resolve(__dirname, "src/block")
				],
				use: [
					// ...cssLoaders,
					{
						loader: require.resolve('sass-loader'),
						options: {
							sourceMap: !isProduction,
						},
					},
				],
			},
		]
	}
};
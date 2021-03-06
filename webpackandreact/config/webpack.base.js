const path = require('path');
var webpackhtmlplugin=require("html-webpack-plugin")
var CleanWebpackPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports={
	entry:['babel-polyfill','./src/index.js'],
	
	plugins:[
	new webpackhtmlplugin({
		template:'src/index.html'
	}),
	new ExtractTextPlugin({
		filename: "static/css/style.css",
	}),
	new CopyWebpackPlugin([{
		from:"src/static",
		to:"static"}
	])
	],
		module: {
		rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
					   presets: ['env',"react"],
					   plugins:['dynamic-import-webpack']
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}

		]
	},
}

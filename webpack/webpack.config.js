const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
   entry: {

     app: './src/index.js',
     print: './src/print.js'
    },
  output: {

     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
   },
  module: {
      rules: [
        {
         test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
          ]
        },
         {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
      ]
   },
   devtool: 'inline-source-map',
     plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management1'
      }),
      new CleanWebpackPlugin(['dist']),
      
      new webpack.ProvidePlugin({
    $: 'jquery',
jQuery: 'jquery'
     
      })
    ]
};
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules:[
        {
            test: /\.html$/,
            use: 'html-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            use: [{
            loader: 'file-loader',
            options: {
                name: 'assets/[name].[ext]'
            }
            }]
        },
        {
            test: /\.scss$/,
            exclude: helpers.root('src', 'app'),
            use: ExtractTextPlugin.extract({ 
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.scss$/,
            include: helpers.root('src', 'app'),
            use: ['raw-loader', 'sass-loader']
        },
        {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            use: ExtractTextPlugin.extract({ 
            fallback: 'style-loader', 
            use: 'css-loader' 
            })
        },
        {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            use: ['raw-loader']
        }
    ]
  },
  plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        
        new CopyWebpackPlugin([{
            from: 'src/assets/image',
            to: 'assets'
        }]),

        new CopyWebpackPlugin([{
            from: 'src/assets/icon',
            to: '.'
        }]),
  ]
};

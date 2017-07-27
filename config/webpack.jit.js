var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackCommon = require('./webpack.common');
var helpers = require('./helpers');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge.smart(webpackCommon,{
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: [/\.(aot)\.ts$/],
        use: "source-map-loader"
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { 
              configFileName: 'tsconfig.json' }
          }, 
          'angular2-template-loader',
          'angular-router-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist/jit'], {
      root: helpers.root(''),
      verbose: true
    }),
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
        name: ['app','vendor','polyfills']
    }),
  ]
});

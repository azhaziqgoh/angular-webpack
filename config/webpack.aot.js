var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var webpackCommon = require('./webpack.common');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var AotPlugin = require('@ngtools/webpack').AotPlugin;
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge.smart(webpackCommon,{
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.aot.ts'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: './src/main.ts',
        use: "source-map-loader"
      },
      {
        test: /\.ts$/,
        exclude: './src/main.ts',
        use: '@ngtools/webpack',
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist/aot'], {
      root: helpers.root(''),
      verbose: true
    }),
    new AotPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule:  helpers.root('./src/app/app.module#AppModule')
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

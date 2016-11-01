var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/dev-server',
    'bootstrap-loader',
    path.join(__dirname, 'app'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'app')
    ],
    extension: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
          test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
          loader: 'file'
      },
      {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader?importLoaders=1',
            'postcss-loader',
            'sass-loader'
          ]
      }
    ]
  },
  postcss: [autoprefixer({browsers: ['last 3 versions']})],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:3000'
    }
  }
};

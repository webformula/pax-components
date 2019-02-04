const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = 'development';

module.exports = {
  mode: devMode,
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/components')
        ],
        loader: require.resolve('./src/packaging/loader')
      },

      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/core')
        ],
        loader: require.resolve('./src/packaging/classLoader')
      },

      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src/core')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /external\.css$/,
        include: [
          path.resolve(__dirname, 'src/components')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'style.css' : 'style.min.css'
    })
  ]
};

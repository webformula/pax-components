const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = 'development';

module.exports = {
  mode: devMode,
  entry: './src/index.js',
  output: {
    filename: 'pax-components.js',
    path: path.resolve(__dirname, 'dist')
  },

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /index\.js$/,
        include: [
          path.resolve(__dirname, 'src/components')
        ],
        loader: require.resolve('./scripts-build/loader')
      },

      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/core')
        ],
        loader: require.resolve('./scripts-build/classLoader')
      },

      {
        test: /service\.js$/,
        include: [
          path.resolve(__dirname, 'src/components')
        ],
        loader: require.resolve('./scripts-build/classLoader')
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
      filename: devMode ? 'pax-components.css' : 'pax-components.min.css'
    })
  ]
};

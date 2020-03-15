const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cwd = process.cwd();

module.exports = {
  entry: {
    'entry.js': './src/entry.js',
    'entry': './src/entry.scss',
    'theme': './src/theme.css'
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'local-dist'),
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'local-dist/@webformula/pax-core/index.js')
    }
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only'
};

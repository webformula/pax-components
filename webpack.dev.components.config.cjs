const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('./package.json');

const cwd = process.cwd();

module.exports = {
  entry: {
    [`entry.${version}`]: './src/entry.js',
    'entry': './src/entry.scss',
    'theme': './src/theme.css'
  },

  output: {
    path: path.resolve(__dirname, 'local-dist')
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
      filename: `[name].${version}.css`
    })
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only'
};

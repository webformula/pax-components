const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackStringReplacePlugin = require('html-webpack-string-replace-plugin');
const { version } = require('./package.json');

const cwd = process.cwd();

module.exports = {
  entry: {
    'entry': './src-docs/pax-entry.js'
  },

  output: {
    filename: `[name].${version}.js`,
    path: path.resolve(__dirname, 'dist-docs'),
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'dist-docs/@webformula/pax-core/index.js')
    }
  },

  plugins: [
    new CopyPlugin([
      // copy css files into root of dist folder
      { from: './src-docs/public', to: './' }
    ]),

    new HtmlWebpackPlugin({
      "template": "./src-docs/index.html",
      "filename": "./index.html"
    }),

    new HtmlWebpackStringReplacePlugin({
      '_DIST_': 'local-dist',
      '_VERSION_': version,
    })
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only'
};

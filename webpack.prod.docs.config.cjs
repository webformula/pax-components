const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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

  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },

  plugins: [
    new CopyPlugin([
      // { from: './src-docs/index.html', to: './' },
      { from: './src-docs/public', to: './' }
    ]),

    new HtmlWebpackPlugin({
      "template": "./src-docs/index.html",
      "filename": "./index.html"
    }),

    new HtmlWebpackStringReplacePlugin({
      '_DIST_': 'dist',
      '_VERSION_': version
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },

  mode: 'production'
};

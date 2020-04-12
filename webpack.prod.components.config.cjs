const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cwd = process.cwd();
const { version } = require('./package.json');


module.exports = {
  entry: {
    [`entry.${version}`]: './src/entry.js',
    'entry': './src/entry.scss',
    'theme': './src/theme.css'
  },

  output: {
    // filename: `${version}.[name]`,
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'dist/@webformula/pax-core/index.js')
    }
  },

  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].${version}.css`
    })
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  mode: 'production'
};

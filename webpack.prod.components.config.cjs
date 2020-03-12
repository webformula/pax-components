const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cwd = process.cwd();

module.exports = {
  entry: {
    'entry.js': './src/entry.js',
    'entry': './src/entry.css',
    'theme': './src/theme.css'
  },

  output: {
    filename: '[name]',
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
      filename: '[name].css'
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

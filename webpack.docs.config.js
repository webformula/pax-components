const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  entry: {
    'entry.js': './src-docs/entry.js'
  },

  output: {
    filename: '[name]',
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
      { from: './src-docs/index.html', to: './' },
      { from: './src-docs/public', to: './' }
    ]),
  ],

  mode: 'development',
  devtool: 'inline-source-map'
};

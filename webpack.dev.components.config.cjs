const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  entry: {
    'entry.js': './src/entry.js'
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

  plugins: [
    new CopyPlugin([
      // copy css files into root of dist folder
      {
        from: './src/**/*.css',
        transformPath(targetPath, absolutePath) {
          return targetPath.replace('src/', '/');
        } }
    ]),
  ],

  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only'
};

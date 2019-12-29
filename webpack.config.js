const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const cwd = process.cwd();
const isMobile = process.argv.includes('--mobile');
const isDev = process.argv.includes('--dev');

module.exports = {
  entry: {
    'pax-components.js': glob.sync('dist-files/**/*.js').map(p => path.resolve(cwd, p))
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'dist-files/@webformula/pax-core/index.js')
    }
  },

  plugins: [
    // force mobile to be true for development
    new webpack.DefinePlugin({
      FORCE_MOBILE: isMobile === true ? JSON.stringify('true') : undefined
    })
  ],

  optimization: {
    minimize: isDev
  }
};

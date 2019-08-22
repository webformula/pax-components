const path = require('path');
const glob = require('glob');

const cwd = process.cwd();

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
  }
};

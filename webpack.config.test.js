const path = require('path');
const glob = require('glob');

const cwd = process.cwd();

module.exports = {
  entry: {
    'pax-components.js': glob.sync('test-dist/**/*.js').map(p => path.resolve(cwd, p))
  },
  
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'test-dist-webpack'),
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'test-dist/@webformula/pax-core/index.js')
    }
  }
};

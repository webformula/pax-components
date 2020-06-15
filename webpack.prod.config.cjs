const path = require('path');
const cwd = process.cwd();

module.exports = {
  entry: {
    'entry': './src/entry.js'
  },

  output: {
    path: path.resolve(__dirname, 'release')
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'release/@webformula/pax-core/index.js')
    }
  },

  mode: 'production'
};

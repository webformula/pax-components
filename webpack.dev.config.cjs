const path = require('path');
const cwd = process.cwd();

module.exports = {
  entry: {
    'entry': './src/entry.js'
  },

  output: {
    path: path.resolve(__dirname, 'local')
  },

  resolve: {
    alias: {
      '/@webformula/pax-core/index.js': path.resolve(cwd, 'local/@webformula/pax-core/index.js')
    }
  },

  mode: 'development',
  stats: 'errors-only'
};

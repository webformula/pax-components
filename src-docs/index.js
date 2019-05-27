const {
  PageMapper,
  client,
  html
} = require('@webformula/pax-core');
require('./components/codemirror.js');
require('./components/anchor-link.js');

const layout = require('./layout');
const pageMapper = new PageMapper('src-docs/pages');
pageMapper.pageNotFount = '404';
pageMapper.root = 'home';
// pageMapper.route('newroute/test', 'introduction');
// pageMapper.addRoute('newroute/test', 'introduction');

client.build({ pageMapper, layout, path: 'dist-docs' });

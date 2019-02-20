const {
  PageMapper,
  buildClient,
  html
} = require('@webformula/pax-core');

const layout = require('./layout');
const pageMapper = new PageMapper('src-docs/pages');
pageMapper.pageNotFount = '404';
pageMapper.root = 'home';
// pageMapper.route('newroute/test', 'introduction');
// pageMapper.addRoute('newroute/test', 'introduction');

buildClient({ pageMapper, layout, path: 'dist-docs' });

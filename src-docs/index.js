import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src-docs',
  pagesFolder: 'pages',
  layoutFilePath: 'layout/index.js',
  distFolder: 'dist-docs',
  routerConfig: {
    root: 'home'
  }
});

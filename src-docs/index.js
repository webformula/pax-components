import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src-docs',
  pagesFolder: 'pages',
  layoutFilePath: 'src-docs/layout/index.js',
  distFolder: 'dist-docs',
  routerConfig: {
    root: 'home'
  }
});

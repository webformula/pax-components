import buildEntry from '@webformula/pax-core/src/buildEntry.js';

buildEntry({
  rootFolder: 'src-docs',
  pagesFolder: 'pages',
  templateFile: true,
  templateFilePath: 'build/pax-templates.js',
  routerConfig: {
    root: 'home'
  }
});

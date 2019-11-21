import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src',
  distFolder: 'dist-files',
  css: {
    concat: true,
    filename: 'app.css'
  }
}, {
  includeEntry: false,
  includeIndexHTML: false,
  includeRouter: false,
  customHTMLElementExtendedName: 'HTMLElementExtendedPaxComponents.js'
});

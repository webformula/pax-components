import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src',
  distFolder: 'dist-files'
}, {
  includeIndexHTML: false,
  includeRouter: false,
  customHTMLElementExtendedName: 'HTMLElementExtendedPaxComponents.js'
});

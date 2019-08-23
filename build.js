import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src',
  distFolder: 'dist-files'
}, {
  includeIndexHTML: false,
  includeOnly: ['HTMLElementExtended.js'],
  customHTMLElementExtendedName: 'HTMLElementExtendedPaxComponents.js'
});

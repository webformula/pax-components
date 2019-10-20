import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src',
  distFolder: 'dist-files'
}, {
  includeEntry: false,
  includeIndexHTML: false,
  includeRouter: false,
  customHTMLElementExtendedName: 'HTMLElementExtendedPaxComponents.js'
});

import { build } from '@webformula/pax-core';

build({
  rootFolder: 'src',
  distFolder: 'test-dist'
}, {
  buildIndexHTML: false,
  paxCoreIncludeOnly: ['HTMLElementExtended.js'],
  customHTMLElementExtendedName: 'HTMLElementExtendedPaxComponents.js'
});

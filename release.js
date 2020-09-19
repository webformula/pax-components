import fs from 'fs';
import replace from 'replace';

const { version } = JSON.parse(fs.readFileSync('./package.json'));

// replace '_VERSION_' '0.14.0-beta' build/* && replace '\"web_modules/@webformula/pax-core.js' '\"/web_modules/@webformula/pax-core.js' build/pax-entry.js


replace({
  regex: "_VERSION_",
  replacement: version,
  paths: ['src-docs/'],
  recursive: true,
  silent: false,
});

// replace({
//   regex: "\"web_modules/@webformula/pax-core.js",
//   replacement: '\"/web_modules/@webformula/pax-core.js',
//   paths: ['build/pax-entry.js'],
//   recursive: true,
//   silent: true,
// });

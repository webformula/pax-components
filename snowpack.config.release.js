const fs = require('fs');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'))


module.exports = {
  "scripts": {
    // build pax components
    "run:sass": "node-sass src/entry.scss release/entry.css --no-source-map --output-style compressed",
    "run:theme": "cp src/theme.css release/theme.css",
    "run:js": "webpack --config webpack.prod.config.cjs",

    // build src
    "run:pax-build": "node --experimental-modules buildDocsEntry.mjs",
    "run:move": "cp -a src-docs/public/* build/",
    "mount:public": "mount src-docs/public --to /",
    "mount:web_modules": "mount web_modules",
    "mount:paxcomponents": "mount release --to /pax-components",
    "mount:monaco": "mount monaco-dist",
    "mount:src": "mount src-docs --to /"
  },
  "install": [
    "@webformula/pax-core"
  ],
  "buildOptions": {
    "baseUrl": "./"
  }
};

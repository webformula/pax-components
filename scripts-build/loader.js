const fs = require('fs');
const path = require('path');
const { html, cssStr } = require('./template-literal-tags')
const HTMLElement = require('@webformula/pax-core/src/server_client/HTMLElement.js');

module.exports = function(content) {
  const { name, partial, full } = buildHTMLElementExtended(content);
  const instance = eval('new '+partial);
  let cssSTR = '';
  if (instance.cssFile) cssSTR = fs.readFileSync(path.join(process.cwd(),  instance.cssFile()));
  else cssSTR = instance.css();
  const templateIIFE = `(function(){
    var t=document.createElement('template');
    t.setAttribute('id','${name}');
    t.innerHTML=\`
    <style>
      ${cssSTR}
    </style>
    <render-block>
      ${instance.template()}
    </render-block>
    \`;
    document.body.insertAdjacentElement('beforeend', t);
  }());`;

  return `
    document.addEventListener("DOMContentLoaded", function (event) {
      ${[
        templateIIFE,
        `customElements.define("${name}", ${full});`
      ].join('\n')}
    });
  `;
};

function buildHTMLElementExtended(content) {
  if (!content.includes('HTMLElementExtended')) return content;

  // get component name
  const name = getComponentName(content);
  const id = toCamelCase(name);
  const classContent = getClassContent(content);
  let { preConstructor, constructor, postConstructor } = splitOnConstructor(classContent)
  // constructor = addLineToConstructor(constructor, `this.setAttribute('id', '$${id}');`);
  const hasCSS = content.includes('css()'); // TODO use regex to allow for space
  const hasHTML = content.includes('template()'); // TODO use regex to allow for space

  const modifiedContent = `
    ${preConstructor}
    ${constructor}
    ${postConstructor}

    ${hasCSS ? '' : 'css() { return ""; }'}
    ${hasHTML ? '' : 'template() { return ""; }'}
  `;

  return {
    name,
    partial: `
      class ${id} extends HTMLElement {
        ${modifiedContent}
        render() {}
        cloneTemplate() {}
      }
    `,
    full: `
      class ${id} extends HTMLElement {
        ${modifiedContent}

        render() {
          const renderBlock = this.shadowRoot.querySelector('render-block');
          if (!renderBlock) throw Error('Could not find <render-block>');
          renderBlock.innerHTML = this.template();
        }

        cloneTemplate(rerender = false) {
          var template = document.getElementById('${name}');
          var templateContent = template.content;
          var shadowRoot = this.shadowRoot ? this.shadowRoot : this.attachShadow({mode: 'open'});
          var clone = templateContent.cloneNode(true);
          if (rerender) clone.querySelector('render-block').innerHTML = this.template();
          shadowRoot.appendChild(clone);
        }
      }
    `
  };
}

function addLineToConstructor(constructor, line) {
  return `${constructor.slice(0, constructor.lastIndexOf('}'))}
  ${line}
}`;
}

function splitOnConstructor(classContent) {
  const cpos = classContent.indexOf('constructor');
  if (cpos > -1) {
    let constructor = classContent.slice(cpos);
    const closingBracketIndex = constructor.search(/}[\n\r\s]+/g);
    return {
      preConstructor: classContent.slice(0, cpos),
      constructor: constructor.slice(0, closingBracketIndex + 1),
      postConstructor: constructor.slice(closingBracketIndex + 1)
    };
  }

  return {
    preConstructor: '',
    constructor: `constructor() {
      super();
    }`,
    postConstructor: classContent
  };
}

function getClassContent(content) {
  return content.slice(content.indexOf('{') + 1, content.lastIndexOf('}'));
}

function getComponentName(content) {
  return content.match(/define\(["'](.*?)["']/)[1];
}

function toCamelCase(name) {
  return name.replace(/\-([a-z])/g, m => m.toUpperCase()).replace(/-/g,'');
}

function extractClass(content) {
  let closingIndex = content.lastIndexOf(');');
  if (closingIndex === -1) closingIndex = content.lastIndexOf(')');
  return content.slice(content.indexOf(',') + 1, closingIndex);
}

import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('monaco-editor', class extends HTMLElementExtended {
  constructor() {
    super();
    this.getContent();
  }

  connectedCallback() {
    if (window.monacoLoaded) this.init();
    else this.wait();
  }

  wait() {
    setTimeout(() => {
      if (window.monacoLoaded) this.init();
      else this.wait();
    }, 500);
  }

  init() {
    this.style.height = `${(this.lineCount * 18) + 12}px`;
    this.editor = monaco.editor.create(this, {
      value: this.content_,
      language: this.language,
      scrollBeyondLastLine: false,
      theme: 'NightOwl',
      minimap: {
        enabled: false
      },
      readOnly: true,
      autoIndent: true,
      indentGuides: {
        enabled: false
      }
    });

    // prevent keyboard from opening on mobile
    [...this.querySelectorAll('textarea')].forEach(el => {
      el.setAttribute('readonly', 'readonly');
    });
  }

  singleLineString(strings, ...values) {
    // Interweave the strings with the
    // substitution vars first.
    let output = '';
    for (let i = 0; i < values.length; i++) {
      output += strings[i] + values[i];
    }
    output += strings[values.length];

    // Split on newlines.
    let lines = output.split(/(?:\r\n|\n|\r)/);

    // Rip out the leading whitespace.
    return lines.map((line, i) => {
      let notSpace = true;
      if (i === 0) {
        const spaceCount = line.split(' ').filter(i => {
          if (i !== ' ') notSpace = false;
          return notSpace;
        }).length;
        console.log('spaceCount', spaceCount);
      };
      return line.replace(/^\s+/gm, '');
    }).join(' ').trim();
  }

  get language() {
    let mode = this.hasAttribute('language') ? this.getAttribute('language') : 'javascript';
    return mode;
  }

  get code() {
    if (!this._code) this._code = this.querySelector('code');
    return this._code;
  }

  removeLeadingTabs(lines) {
    // remove first line if its empty
    // this happens because of the html tabbing
    if (lines[0] === '') lines.shift();

    // get number of leading spaces from first line
    let idSpace = true;
    const maxSpaceCount = (lines[0] || '1').split(/(?:\s)/).filter(i => {
      if (i !== '') idSpace = false;
      return idSpace;
    }).length - 1;


    // remove the same amount of spaces form all the lines
    lines = lines.map(line => {
      let notSpace = false;
      return line.split(/(?:\s)/).filter((c, i) => {
        if (notSpace || i >= maxSpaceCount) return true;
        if (c !== '') {
          notSpace = true;
          return true;
        }
        return false;
      }).join(' ');
    });

    // remove trailing empty line
    if (lines[lines.length - 1] === '') lines.pop();

    return lines;
  }

  getContent() {
    let lines;
    if (this.hasAttribute('content')) lines = this.getAttribute('content');
    else lines = this.querySelector('code') ? this.querySelector('code').innerHTML : (this.innerHTML || '');

    lines = this.removeLeadingTabs(lines.split(/(?:\r\n|\n|\r)/));

    this.lineCount = lines.length;
    this.content_ = lines.join('\n');
    this.innerHTML = '';
  }
});

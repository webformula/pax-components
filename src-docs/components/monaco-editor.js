import { HTMLElementExtended } from '/web_modules/@webformula/pax-core/index.js';

let themeFile;

// this is called twice because the docs loads multiple versions of the code. To prevent an error we are double checking for the existence
if (!customElements.get('monaco-editor')) {
  customElements.define('monaco-editor', class extends HTMLElementExtended {
    constructor() {
      super();
      this.getContent();
    }

    connectedCallback() {
      if (window.monaco) this.init();
      else this.wait();
    }

    set content(str = '') {
      const lines = this.removeLeadingTabs(str.split(/(?:\r\n|\n|\r)/));
      this.lineCount = lines.length;
      this._content = lines.join('\n');
      this.style.height = `${(this.lineCount * 18) + 12}px`;
      if (window.monaco) {
        this.editor.setValue(this._content);
      } else this.wait();
    }

    wait() {
      setTimeout(() => {
        if (window.monaco) this.init();
        else this.wait();
      }, 500);
    }

    async init() {
      if (!themeFile) {
        await fetch('./NightOwl.json')
          .then(function (data) { return data.json(); })
          .then(function (data) {
            themeFile = data;
            monaco.editor.defineTheme('NightOwl', data);
          });
      }

      this.style.height = `${(this.lineCount * 18) + 12}px`;
      if (this.editor) {
        this.editor.value = this._content;
        return;
      }

      this.editor = monaco.editor.create(this, {
        value: this._content,
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
        },
        automaticLayout: true
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
      this._content = lines.join('\n');
      this.innerHTML = '';
    }
  });
}

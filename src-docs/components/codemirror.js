import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('code-mirror', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
    this.render();
  }

  connectedCallback() {
    CodeMirror.runMode(this.content, this.mode, this.code);
  }

  get mode() {
    const modeAttr = this.hasAttribute('mode') ? 'mode' : this.hasAttribute('type') ? 'type' : undefined;
    let mode = modeAttr ? this.getAttribute(modeAttr) : 'javascript';
    if (mode === 'html') mode = 'xml';
    return mode;
  }

  get type() {
    let mode = this.hasAttribute('type') ? this.getAttribute('type') : 'javascript';
    if (mode === 'html') mode = 'xml';
    return mode;
  }

  get code() {
    if (!this._code) this._code = this.shadowRoot.querySelector('code');
    return this._code;
  }

  get content() {
    if (this.querySelector('code')) this._content = this.querySelector('code').innerText;
    if (!this._content) this._content = this.innerHTML;
    return this._content;
  }

  styles() {
    return `
      @import "one-dark.css";

      @media screen and (max-width: 1084px) {
        :host {
          display: block;
          max-width: calc(100vw - 232px);
        }
      }

      pre {
        position: relative;
      }

      code {
        left: -160px;
        position: relative;
      }
    `;
  }
  template() {
    return '<pre class="cm-s-one-dark"><code></code></pre>';
  }
});

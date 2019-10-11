import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('code-mirror', class extends HTMLElementExtended {
  constructor() {
    super();

    this.content_ = this.querySelector('code') ? this.querySelector('code').innerHTML : this.innerHTML;
    this.innerHTML = '<pre class="cm-s-one-dark"><code></code></pre>';
  }

  connectedCallback() {
    CodeMirror.runMode(this.content_, this.mode, this.code);
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
    if (!this._code) this._code = this.querySelector('code');
    return this._code;
  }

  get content() {
    if (this.querySelector('code')) this._content = this.querySelector('code').innerText;
    if (!this._content) this._content = this.innerHTML;
    return this._content;
  }
});

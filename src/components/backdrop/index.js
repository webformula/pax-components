import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-backdrop', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  get frontElement() {
    return this.querySelector('mdw-backdrop-front');
  }

  get backContentElement() {
    return this.querySelector('mdw-backdrop-back mdw-backdrop-content');
  }

  get backContenHeight() {
    const children = this.backContentElement.children;
    const lastChild = children[children.length - 1];
    const childBounds = lastChild.getBoundingClientRect();
    return this.backContentElement.getBoundingClientRect().y + childBounds.y + childBounds.height;
  }

  get expanded() {
    return this._expanded;
  }

  toggle() {
    if (this._expanded === true) this.contract();
    else this.expand();
  }

  expand() {
    this.frontElement.style.top = `${this.backContenHeight - 56}px`;
    this._expanded = true;
  }

  contract() {
    this.frontElement.style.top = '56px';
    this._expanded = false;
  }
});

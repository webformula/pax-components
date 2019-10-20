import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-backdrop', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  connectedCallback() {
    // this.frontElement.classList.add('mdw-elevation-1--shadow');
  }

  get frontElement() {
    if (!this.frontElement_) this.frontElement_ = this.querySelector('mdw-backdrop-front');
    return this.frontElement_;
  }

  get backContentElement() {
    if (!this.backContentElement_) this.backContentElement_ = this.querySelector('mdw-backdrop-back mdw-backdrop-content');
    return this.backContentElement_;
  }

  get backContenHeight() {
    const children = this.backContentElement.children;
    const lastChild = children[children.length - 1];
    const childBounds = lastChild.getBoundingClientRect();
    return this.backContentElement.getBoundingClientRect().y + childBounds.y + childBounds.height;
  }

  get expanded() {
    return this.expanded_;
  }

  toggle() {
    if (this.expanded_ === true) this.contract();
    else this.expand();
  }

  expand() {
    this.frontElement.style.top = `${this.backContenHeight - 56}px`;
    this.expanded_ = true;
  }

  contract() {
    this.frontElement.style.top = '56px';
    this.expanded_ = false;
  }
});

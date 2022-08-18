import { HTMLElementExtended } from '@webformula/pax-core/index.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-expander-content', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
  }

  connectedCallback() {
    if (this.hasAttribute('height')) this.height = this.getAttribute('height').replace('px', '');
    this.parentNode.registerContent(this);
  }

  static get observedAttributes() {
    return ['height'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get height() {
    return this._height || this.scrollHeight;
  }

  set height(value) {
    this._height = value;
  }

  open() {
    this.style.display= 'block';
    this.classList.add('show');
    this.style.maxHeight = `${this.height}px`;
    this.style.opacity = 1;
  }

  close() {
    this.classList.remove('show');
    this.style.maxHeight = 0;
    this.style.opacity = 0;
    this.onHideComplete();
  }

  onHideComplete() {
    const self = this;
    self.addEventListener(MDWUtils.transitionEventName, function handler() {
      self.style.display= 'none';
      self.removeEventListener(MDWUtils.transitionEventName, handler);
    });
  }

  css() {
    return cssStr`
      :host {
        display: block;
        overflow: hidden;
        opacity: 0;
        max-height: 0;
        transition: max-height 0.12s cubic-bezier(0.25, 0.8, 0.25, 1),
                    opacity 0.12s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      :host(.show) {
        display: block;
      }
    `;
  }

  template() {
    return /* html */`
      <slot></slot>
    `;
  }
});

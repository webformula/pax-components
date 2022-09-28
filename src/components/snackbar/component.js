import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!css-loader!./component.css?raw';

customElements.define('mdw-snackbar', class MDWButton extends HTMLElementExtended {
  useShadowRoot = true;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  template() {
    return /* html */`
      <slot></slot>
      <style>
        ${styleAsString}
      </style>
    `;
  }
});

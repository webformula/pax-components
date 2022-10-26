import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!css-loader!./component.css?raw';

// TODO update style to v3

customElements.define('mdw-snackbar', class MDWSnackbar extends HTMLElementExtended {
  useShadowRoot = true;

  constructor() {
    super();

    this.setAttribute('role', 'alertdialog');
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

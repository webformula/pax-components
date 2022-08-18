import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import styleAsString from '!!css-loader!./component.css?raw';

// TODO async
// TODO icon
// TODO href
// TODO form

customElements.define('mdw-button', class MDWButton extends HTMLElementExtended {
  useShadowRoot = true;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();

    setTimeout(() => {
      this.ripple = new Ripple({
        element: this.shadowRoot.querySelector('.mdw-ripple'),
        triggerElement: this
      });
    }, 0);
  }

  disconnectedCallback() {
    this.ripple.destroy();
  }

  template() {
    return /* html */`
      <span class="text"><slot></slot></span>
      <span class="mdw-spinner-container"></span>
      <div class="mdw-ripple mdw-button-ripple"></div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});

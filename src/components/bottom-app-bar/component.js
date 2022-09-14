import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';

customElements.define('mdw-bottom-app-bar', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #rippleElements = [];

  constructor() {
    super();
  }

  async connectedCallback() {
    this.#rippleElements = [...this.querySelectorAll('nav > a > .mdw-ripple')].map(element => new Ripple({
      element: element,
      triggerElement: element.parentNode
    }));
  }

  disconnectedCallback() {
    this.#rippleElements.forEach(r => r.destroy());
  }
});

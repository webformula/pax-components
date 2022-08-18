import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';

customElements.define('mdw-icon', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  constructor() {
    super();
  }
});

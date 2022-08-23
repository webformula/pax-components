import HTMLElementExtended from '../HTMLElementExtended.js';
import Ripple from '../../core/Ripple.js';
import './component.css';

customElements.define('mdw-card', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  constructor() {
    super();
    this.tabIndex = 0;
    this.mouseUp_bound = this.mouseup.bind(this);
  }


  connectedCallback() {
    this.addEventListener('mouseup', this.mouseUp_bound);

    const rippleElement = this.querySelector(':scope > .mdw-ripple');
    if (rippleElement) {
      setTimeout(() => {
        this.ripple = new Ripple({
          element: rippleElement,
          triggerElement: this
        });
      }, 0);
    }
  }

  disconnectedCallback() {
    this?.ripple?.destroy();
    this.removeEventListener('mouseup', this.mouseUp_bound);
  }

  mouseup() {
    this.blur();
  }
});

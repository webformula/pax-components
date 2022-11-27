import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!raw-loader!./avatar.css';


customElements.define('mdw-avatar', class MDWAvatar extends HTMLElementExtended {
  useShadowRoot = true;

  
  constructor() {
    super();
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value) {
    if (value === true) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }

  connectedCallback() {
    this.render();
  }

  template() {
    return /* html */`
      <slot></slot>
      <svg version="1.1" focusable="false" viewBox="0 0 24 24">
        <path fill="none" stroke="white" stroke-width="2" d="M4.1,12.7 9,17.6 20.3,6.3" ></path>
      </svg>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});

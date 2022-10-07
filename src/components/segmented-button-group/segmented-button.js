import HTMLElementExtended from '../HTMLElementExtended.js';
import styleAsString from '!!css-loader!./segmented-button.css?raw';

customElements.define('mdw-segmented-button', class MDWSegmentedButton extends HTMLElementExtended {
  useShadowRoot = true;

  constructor() {
    super();
    this.tabIndex = 0;
    if (this.parentNode.classList.contains('mdw-selected-icon')) this.classList.add('mdw-selected-icon');
    if (!this.hasAttribute('value')) this.value = this.innerText.trim();
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    setTimeout(() => {
      this.classList.add('mdw-add-animation');
    }, 400);
  }

  get value() {
    return this.getAttribute('value') || this.innerText.trim();
  }

  set value(_value) {
    this.setAttribute('value', _value);
  }

  template() {
    return /* html */`
      <style>
        ${styleAsString}
      </style>
      <svg version="1.1" focusable="false" viewBox="0 0 16 16">
        <path fill="none" stroke="white" d="M5,8 7.7,10 12,5.5" ></path>
      </svg>
      <div class="slot-container"><slot></slot></div>
    `;
  }
});

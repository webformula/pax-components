import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import styleAsString from '!!css-loader!./component.css?raw';


customElements.define('mdw-progress-circular', class MDWProgressCircular extends HTMLElementExtended {
  useShadowRoot = true;
  diameter = 40;

  constructor() {
    super();

    this.setAttribute('role', 'progressbar');
  }

  get percent() {
    return this.getAttribute('mdw-percent');
  }
  set percent(value) {
    this.setAttribute('mdw-percent', value);
  }

  static get observedAttributes() {
    return ['mdw-percent', 'diameter'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'mdw-percent') {
      if (this.rendered === true) this.#updatePercent(newValue);
    }

    if (name === 'diameter') {
      this.diameter = newValue;
      this.style.width = `${newValue}px`;
      this.style.height = `${newValue}px`;
    }
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    if (this.rendered === false) {
      this.#updatePercent(this.percent);
    }
  }

  #updatePercent(value) {
    if (value === null || isNaN(value)) return;
    value = parseInt(value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    this.shadowRoot.querySelector('circle').style.strokeDashoffset = `${this.#strokeCircumference * (100 - value) / 100}px`;
  }

  get #radius() {
    return (this.diameter - 10) / 2;
  }

  get #strokeCircumference() {
    return 2 * Math.PI * this.#radius;
  }
  
  template() {
    const startValue = 0.95 * this.#strokeCircumference;
    const endValue = 0.2 * this.#strokeCircumference;
    return /* html*/ `
      <style>
        ${styleAsString}
        @keyframes mdw-progress-circular-rotate-${this.diameter} {
          0%      { stroke-dashoffset: ${startValue};  transform: rotate(0); }
          12.5%   { stroke-dashoffset: ${endValue};    transform: rotate(0); }
          12.5001%  { stroke-dashoffset: ${endValue};    transform: rotateX(180deg) rotate(72.5deg); }
          25%     { stroke-dashoffset: ${startValue};  transform: rotateX(180deg) rotate(72.5deg); }
          25.0001%   { stroke-dashoffset: ${startValue};  transform: rotate(270deg); }
          37.5%   { stroke-dashoffset: ${endValue};    transform: rotate(270deg); }
          37.5001%  { stroke-dashoffset: ${endValue};    transform: rotateX(180deg) rotate(161.5deg); }
          50%     { stroke-dashoffset: ${startValue};  transform: rotateX(180deg) rotate(161.5deg); }
          50.0001%  { stroke-dashoffset: ${startValue};  transform: rotate(180deg); }
          62.5%   { stroke-dashoffset: ${endValue};    transform: rotate(180deg); }
          62.5001%  { stroke-dashoffset: ${endValue};    transform: rotateX(180deg) rotate(251.5deg); }
          75%     { stroke-dashoffset: ${startValue};  transform: rotateX(180deg) rotate(251.5deg); }
          75.0001%  { stroke-dashoffset: ${startValue};  transform: rotate(90deg); }
          87.5%   { stroke-dashoffset: ${endValue};    transform: rotate(90deg); }
          87.5001%  { stroke-dashoffset: ${endValue};    transform: rotateX(180deg) rotate(341.5deg); }
          100%    { stroke-dashoffset: ${startValue};  transform: rotateX(180deg) rotate(341.5deg); }
        }
      </style>
      <svg style="width: ${this.diameter}px; height: ${this.diameter}px;">
        <circle
          cx="50%"
          cy="50%"
          r="${this.#radius}"
          style="
            animation-name: mdw-progress-circular-rotate-${this.diameter};
            stroke-dasharray: ${this.#strokeCircumference}px;
            stroke-width: 4px;
          "
          ></circle>
      </svg>
    `;
  }
});

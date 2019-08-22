import { HTMLElementExtended } from '@webformula/pax-core';

customElements.define('mdw-circular-progress', class extends HTMLElementExtended {
  constructor() {
    super();
    this.insertedDiameters = [];
    this.cloneTemplate();
  }

  connectedCallback() {
    this.diameter = this.getAttribute('mdw-diameter') || 100;
    this.render();
    this.style.width = this.style.height = this.diameter + 'px';
    if (this.value) this.value = this.value;
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  get diameter() {
    return this._diameter;
  }
  set diameter(value) {
    this._diameter = parseInt((''+value).replace('px', ''));
    if (!this.insertedDiameters[this._diameter]) {
      this.insertedDiameters.push(this._diameter);
      this.shadowRoot.querySelector('style').sheet.insertRule(this._getAnimationText(), 0);
    }
  }

  get svg() {
    if (!this._svg) this._svg = this.shadowRoot.querySelector('svg');
    return this._svg;
  }

  get strokeWidth() {
    return this._strokeWidth || this.diameter / 10;
  }
  set strikeWidth(value) {
    this._strokeWidth = parseInt((''+value).replace('px', ''));
  }

  get value() {
    return this.getAttribute('value');
  }
  set value(value) {
    this._value = Math.max(0, Math.min(100, parseInt((''+value).replace('px', ''))));
    if (this.diameter === undefined) return;
    this.circle.style.strokeDashoffset = (this._strokeCircumference * (100 - this._value) / 100) + 'px';
  }

  get mode() {
    return this.getAttribute('mdw-mode') === 'determinate' ? 'determinate' : 'indeterminate';
  }

  get circle() {
    if (!this._circle) this._circle = this.shadowRoot.querySelector('circle');
    return this._circle;
  }

  get _circleRadius() {
    return (this.diameter - 10) / 2;
  }

  get _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }

  get _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius;
  }

  get INDETERMINATE_ANIMATION_TEMPLATE() {
    return `
     @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {
        0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
        12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
        12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
        25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }
        25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
        37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
        37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
        50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }
        50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
        62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
        62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
        75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }
        75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
        87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
        87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
        100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
      }
    `;
  }

  _getAnimationText() {
    return this.INDETERMINATE_ANIMATION_TEMPLATE
      .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
      .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
      .replace(/DIAMETER/g, `${this.diameter}`);
  }

  template() {
    return html`
      <svg style="width: ${this.diameter}px; height: ${this.diameter}px;">
        <circle
          cx="50%"
          cy="50%"
          r="${this._circleRadius}"
          style="
            animation-name: mat-progress-spinner-stroke-rotate-${this.diameter};
            stroke-dasharray: ${this._strokeCircumference}px;
            stroke-width: ${this._circleStrokeWidth}%;
          "
          ></circle>
      </svg>
    `;
  }

  get internalStylesFile() {
    return './internal.css'
  }
});

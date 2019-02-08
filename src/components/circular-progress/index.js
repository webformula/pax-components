customElements.define('mdw-circular-progress', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();

    this.diameter = this.getAttrbute('diameter') || 100;
  }

  get diameter() {
    return this._diameter;
  }
  set diameter(value) {
    this._diameter = parseInt(value.replace('px', ''));
    if (!CircularProgressStyleManager.exists(this._diameter)) {
      CircularProgressStyleManager.create(this._diameter, this._getAnimationText());
    }
  }

  get strokeWidth() {
    return this._strokeWidth || this.diameter / 10;
  }
  set strikeWidth(value) {
    this._strokeWidth = parseInt(value.replace('px', ''));
  }

  get value() {
    return this.mode === 'determinate' ? this._value : 0;
  }
  set value(value) {
    this._value = Math.max(0, Math.min(100, parseInt(value.replace('px', ''))));
  }

  get mode() {
    return this.getAttrbute('mode') === 'determinate' ? 'determinate' : 'indeterminate';
  }

  get _circleRadius() {
    return (this.diameter - 10) / 2;
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
    return this.  INDETERMINATE_ANIMATION_TEMPLATE
      .replace(/START_VALUE/g, `${0.95 * this._strokeCircumference}`)
      .replace(/END_VALUE/g, `${0.2 * this._strokeCircumference}`)
      .replace(/DIAMETER/g, `${this.diameter}`);
  }

  // [style.width.px]="diameter"
  // [style.height.px]="diameter"
  // [attr.viewBox]="_viewBox"
  // preserveAspectRatio="xMidYMid meet"
  // focusable="false"
  // [ngSwitch]="mode === 'indeterminate'"


  // cx="50%"
  // cy="50%"
  // [attr.r]="_circleRadius"
  // [style.animation-name]="'mat-progress-spinner-stroke-rotate-' + diameter"
  // [style.stroke-dashoffset.px]="_strokeDashOffset"
  // [style.stroke-dasharray.px]="_strokeCircumference"
  // [style.stroke-width.%]="_circleStrokeWidth"

  html() {
    return html`
      <svg>
        <circle></circle>
      </svg>
    `;
  }
});

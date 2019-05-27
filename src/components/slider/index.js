customElements.define('mdw-slider', class extends HTMLElementExtended {
  constructor() {
    super();
    this.cloneTemplate();
    this.bound_onMouseDown = this.onMouseDown.bind(this);
    this.bound_onMouseUp = this.onMouseUp.bind(this);
    this.bound_onMouseMove = this.onMouseMove.bind(this);
    this.bound_onMouseEnter = this.onMouseEnter.bind(this);
    this.bound_onMouseLeave = this.onMouseLeave.bind(this);
    this.bound_trackClick = this.trackClick.bind(this);
  }

  connectedCallback() {
    this.value = this.attrValue;
    this.thumbContainer.style.left = `${((this.attrValue - this.min) / this.range) * this.offsetWidth}px`;
    this.notchContainer.style.marginLeft = `-${this.offsetWidth - (((this.attrValue - this.min) / this.range) * this.offsetWidth)}px`;
    this.throttled_dispatchChange = MDWUtils.rafThrottle(this.dispatchChange);
    this.thumb.addEventListener('mousedown', this.bound_onMouseDown);
    this.thumb.addEventListener('mouseenter', this.bound_onMouseEnter);
    this.track.addEventListener('click', this.bound_trackClick);
  }

  disconnectedCallback() {
    this.thumb.removeEventListener('mousedown', this.bound_onMouseDown);
    this.thumb.removeEventListener('mouseenter', this.bound_onMouseEnter);
    this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
    this.track.removeEventListener('click', this.bound_trackClick);
    document.removeEventListener('mouseup', this.bound_onMouseUp);
    document.removeEventListener('mousemove', this.bound_onMouseMove);
  }

  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    if (['min', 'max', 'step'].includes(name)) this.render();
  }

  get min() {
    return this.min_ || 0;
  }

  set min(value) {
    this.min_ = parseFloat(value);
  }

  get max() {
    return this.max_ || 100;
  }

  set max(value) {
    this.max_ = parseFloat(value);
  }

  get range() {
    return this.max - this.min;
  }

  get step() {
    return this.step_;
  }

  set step(value) {
    this.step_ = parseFloat(value);
  }

  get stepCount() {
    return !this.step ? 0 : Math.floor(this.range / this.step);
  }

  get attrValue() {
    let value = parseFloat(this.getAttribute('value') || 0);
    if (value < this.min) value = this.min;
    return value;
  }

  get value() {
    const { width } = this.getBoundingClientRect();
    const x = (this.thumbContainer.style.left || '0px').replace('px', '');
    const percent = x / width;
    const range = this.range;
    this.value_ = this.min + (percent * range);
    // check if the step is a integer and then garentee the value is an int
    // becuase of how math works in javascript(floating point) this is not a garentee without parseInt
    if (!(''+this.step).includes('.')) this.value_ = parseInt(this.value_);
    return this.value_ || 0;
  }

  set value(value) {
    this.value_ = parseFloat(value);
  }

  get thumb() {
    return this.shadowRoot.querySelector('.mdw-slider__thumb-hover');
  }

  get thumbContainer() {
    if (!this.thumbContainer_) this.thumbContainer_ = this.shadowRoot.querySelector('.mdw-slider__thumb-container');
    return this.thumbContainer_;
  }

  get notchContainer() {
    if (!this.notchContainer_) this.notchContainer_ = this.shadowRoot.querySelector('.mdw-slider__notch-container');
    return this.notchContainer_;
  }

  get track() {
    return this.shadowRoot.querySelector('.mdw-slider__track-container');
  }

  trackClick(e) {
    const { left, width } = this.getBoundingClientRect();
    let x = e.layerX;
    if (e.clientX < left) x = 0;
    if (x > width) x = width;
    this.thumbContainer.style.left = `${this.snap(x, width)}px`;
    this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
    this.dispatchChange();
  }

  onMouseDown(e) {
    this.classList.add('mdw-pressed');
    document.addEventListener('mouseup', this.bound_onMouseUp);
    document.addEventListener('mousemove', this.bound_onMouseMove);
  }

  onMouseUp(e) {
    this.classList.remove('mdw-pressed');
    document.removeEventListener('mouseup', this.bound_onMouseUp);
    document.removeEventListener('mousemove', this.bound_onMouseMove);
  }

  onMouseMove(e) {
    const { left, width } = this.getBoundingClientRect();
    let x = e.layerX;
    if (e.clientX < left) x = 0;
    if (x > width) x = width;
    this.thumbContainer.style.left = `${this.snap(x, width)}px`;
    this.notchContainer.style.marginLeft = `-${this.offsetWidth - this.snap(x, width)}px`;
    this.throttled_dispatchChange();
  }

  onMouseEnter(e) {
    this.classList.add('mdw-hover');
    this.thumb.addEventListener('mouseleave', this.bound_onMouseLeave);
  }

  onMouseLeave(e) {
    this.classList.remove('mdw-hover');
    this.thumb.removeEventListener('mouseleave', this.bound_onMouseLeave);
  }

  snap(x, width) {
    if (!this.step) return x;
    const percent = x / width;
    const range = this.range;
    const convertedValue = percent * range;
    const snapedValue = convertedValue - (convertedValue % this.step);
    return (snapedValue / range) * width
  }

  dispatchChange() {
    this.dispatchEvent(new Event('change', this));
  }

  cssFile() {
    return '/src/components/slider/internal.css'
  }

  template() {
    return html`
      <div class="mdw-slider__track-container">
        <div class="mdw-slider__track"></div>

        <div class="mdw-slider__notch-container">
          <div class="mdw-slider__notch-pre-container">
            ${[...new Array(this.stepCount)].map(i => `<div class="mdw-slider__notch"></div>`).join('\n')}
          </div>

          <div class="mdw-slider__notch-post-container">
            ${[...new Array(this.stepCount)].map(i => `<div class="mdw-slider__notch"></div>`).join('\n')}
          </div>
        </div>
      </div>
      <div class="mdw-slider__thumb-container">
        <div class="mdw-slider__thumb"></div>
        <div class="mdw-slider__thumb-hover"></div>
      </div>
    `;
  }
});

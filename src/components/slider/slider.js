import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import styleAsString from '!!css-loader!./slider.css?raw';

customElements.define('mdw-slider', class MDWSlider extends HTMLElementExtended {
  useShadowRoot = true;

  #min = 0;
  #max = 100;
  #value = 50;
  #step = 1;
  #drag = new Drag(this);
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragStart_bound = this.#onDragStart.bind(this);
  #onclick_bound = this.#onclick.bind(this);
  #dragStartLeftPosition;
  #activeTrack;
  #inactiveTrack;
  #thumb;
  #label;
  #isDiscrete = false;

  // TODO arrow inputs, include on focus

  constructor() {
    super();

    this.tabIndex = 0;
    this.setAttribute('role', 'slider');
    this.#isDiscrete = this.classList.contains('mdw-discrete');
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    this.#activeTrack = this.shadowRoot.querySelector('.mdw-track-active');
    this.#inactiveTrack = this.shadowRoot.querySelector('.mdw-track-inactive');
    this.#thumb = this.shadowRoot.querySelector('.mdw-thumb');
    this.#label = this.shadowRoot.querySelector('.mdw-label-text');
    this.#setPosition({ percent: this.percent });

    this.#drag = new Drag(this.#thumb);
    this.#drag.includeMouseEvents = true;
    this.#drag.onDrag(this.#onDrag_bound);
    this.#drag.onStart(this.#onDragStart_bound);
    this.#drag.enable();

    this.#inactiveTrack.addEventListener('click', this.#onclick_bound);
    this.#activeTrack.addEventListener('click', this.#onclick_bound);
  }

  disconnectedCallback() {
    this.#drag.destroy();
    this.#inactiveTrack.removeEventListener('click', this.#onclick_bound);
    this.#activeTrack.removeEventListener('click', this.#onclick_bound);
  }

  static get observedAttributes() {
    return ['min', 'max', 'value', 'step'];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === 'min') this.min = newValue;
    if (name === 'max') this.max = newValue;
    if (name === 'value') this.value = newValue;
    if (name === 'step') this.step = newValue;
  }

  get value() {
    return `${this.#value}`;
  }
  set value(value = 50) {
    this.#value = parseFloat(value);
    this.#adjustValueOnParams();
  }

  get min() {
    return `${this.#min}`;
  }
  set min(value = 0) {
    this.#min = parseInt(value);
    this.#adjustValueOnParams();
  }

  get max() {
    return `${this.#max}`;
  }
  set max(value = 100) {
    this.#max = parseInt(value);
    this.#adjustValueOnParams();
  }

  get step() {
    return `${this.#step}`;
  }
  set step(value = 1) {
    this.#step = parseFloat(value);
    this.#adjustValueOnParams();
  }

  get percent() {
    return (this.#value - this.#min) / (this.#max - this.#min);
  }

  get #stepCount() {
    return Math.floor((this.#max - this.#min) / this.#step) + 1;
  }

  #setValueFromPixels(pixels) {
    let percent = pixels / this.offsetWidth;
    if (percent <= 0) percent = 0;
    if (percent >= 1) percent = 1;

    const lastValue = this.#value;
    this.#value = this.#roundByStep(this.#min + (this.#max - this.#min) * percent);

    if (lastValue !== this.#value) this.dispatchEvent(new Event('change'));

    // this will snap to marks
    if (this.#isDiscrete) pixels = this.offsetWidth * this.percent;
    this.#setPosition({ pixels });
  }

  #adjustValueOnParams() {
    if (this.#value < this.#min) this.#value = this.#min;
    if (this.#value > this.#max) this.#value = this.#max;
    this.#value = this.#roundByStep(this.#value);
    if (this.rendered) this.#setPosition({ percent: this.percent });
  }

  #roundByStep(value) {
    const inverse = 1 / this.#step;
    return Math.round(value * inverse) / inverse;
  }

  #setPosition({ percent, pixels }) {
    if (percent && percent > 1) throw Error('percent must be from 0 - 1');
    if (percent) pixels = this.offsetWidth * percent;
    if (pixels < 0) pixels = 0;
    if (pixels > this.offsetWidth) pixels = this.offsetWidth;

    this.#thumb.style.left = `${pixels}px`;
    this.#activeTrack.style.width = `${pixels}px`;
    this.#inactiveTrack.style.left = `${pixels}px`;

    if (this.#isDiscrete) {
      const marks = [...this.shadowRoot.querySelectorAll('.mdw-mark')];
      const thumbX = this.#thumb.getBoundingClientRect().x;
      marks.forEach(mark => {
        if (mark.getBoundingClientRect().x <= thumbX) {
          mark.classList.remove('mdw-inactive');
          mark.classList.add('mdw-active');
        } else {
          mark.classList.remove('mdw-active');
          mark.classList.add('mdw-inactive');
        }
      });
    }

    this.#label.innerHTML = this.#value;
  }

  #onclick(event) {
    this.#setValueFromPixels(event.clientX - this.getBoundingClientRect().x);
  }

  #onDragStart() {
    // there is a margin offset of -10px on the thumb.
    this.#dragStartLeftPosition = this.#thumb.getBoundingClientRect().x - this.getBoundingClientRect().x + 10;
  }

  #onDrag({ distance }) {
    this.#setValueFromPixels(this.#dragStartLeftPosition + distance.x);
  }

  template() {
    return /* html */`
      <div class="mdw-track-inactive"></div>
      <div class="mdw-track-active"></div>

      <div class="mdw-marks">
        ${!this.#isDiscrete ? '' : [...new Array(this.#stepCount)].map(i => `<div class="mdw-mark"></div>`).join('\n')}
      </div>

      <div class="mdw-thumb">
        <div class="mdw-label"><div class="mdw-label-text"></div></div>
      </div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});

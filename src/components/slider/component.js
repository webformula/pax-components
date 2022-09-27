import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import styleAsString from '!!css-loader!./component.css?raw';

customElements.define('mdw-slider', class MDWButton extends HTMLElementExtended {
  useShadowRoot = true;

  #min = 0;
  #max = 100;
  #value = 50;
  #step = 1;
  #drag = new Drag(this);
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragStart_bound = this.#onDragStart.bind(this);
  #onDragEnd_bound = this.#onDragEnd.bind(this);
  #onclick_bound = this.#onclick.bind(this);
  #dragStartLeftPosition;
  #activeTrack;
  #inactiveTrack;
  #thumb;
  #isDiscrete = false;


  constructor() {
    super();

    this.#isDiscrete = this.classList.contains('mdw-discrete');
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    this.#activeTrack = this.shadowRoot.querySelector('.mdw-track-active');
    this.#inactiveTrack = this.shadowRoot.querySelector('.mdw-track-inactive');
    this.#thumb = this.shadowRoot.querySelector('.mdw-thumb');
    this.#setPositionByValue();

    this.#drag = new Drag(this.#thumb);
    this.#drag.includeMouseEvents = true;
    this.#drag.onDrag(this.#onDrag_bound);
    this.#drag.onStart(this.#onDragStart_bound);
    this.#drag.onEnd(this.#onDragEnd_bound);
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'min') this.min = newValue;
    if (name === 'max') this.max = newValue;
    if (name === 'value') this.value = newValue;
    if (name === 'step') this.step = newValue;
  }

  get value() {
    return (this.#value || '').toString();
  }
  set value(value = 50) {
    this.#value = parseFloat(value);
    this.#adjustValueOnParams();
    if (this.rendered) this.#setPositionByValue();
  }

  get min() {
    return (this.#min || '').toString();
  }
  set min(value = 0) {
    this.#min = parseInt(value);
    this.#adjustValueOnParams();
  }

  get max() {
    return (this.#max || '').toString();
  }
  set max(value = 100) {
    this.#max = parseInt(value);
    this.#adjustValueOnParams();
  }

  get step() {
    return (this.#step || '').toString();
  }
  set step(value = 1) {
    this.#step = parseFloat(value);
    this.#adjustValueOnParams();
  }

  get percent() {
    return (this.#value - this.#min) / (this.#max - this.#min) * 100;
  }

  get #stepCount() {
    return Math.floor((this.#max - this.#min) / this.#step) + 1;
  }

  #adjustValueOnParams() {
    if (this.#value < this.#min) this.#value = this.#min;
    if (this.#value > this.#max) this.#value = this.#max;
    this.#value = this.#roundByStep(this.#value);
  }

  #setPositionByValue() {
    const percent = this.percent;
    this.#activeTrack.style.width = `${percent}%`;
    this.#inactiveTrack.style.left = `${percent}%`;
    this.#thumb.style.left = `${percent}%`;
    this.#updateMarks();
  }

  #updateMarks() {
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
    })
  }

  #onclick(event) {
    let percent = (event.clientX - this.getBoundingClientRect().x) / this.offsetWidth;
    if (percent <= 0) percent = 0;
    if (percent >= 1) percent = 1;
    this.value = this.#min + (this.#max - this.#min) * percent;
  }

  #onDragStart() {
    // there is a margin offset of -10px on the thumb.
    this.#dragStartLeftPosition = this.#thumb.getBoundingClientRect().x - this.getBoundingClientRect().x + 10;
  }

  #onDrag({ distance }) {
    let position = this.#dragStartLeftPosition + distance.x;
    if (position < 0) position = 0;
    if (position > this.offsetWidth) position = this.offsetWidth;

    if (this.#isDiscrete === true) {
      this.value = this.#min + (this.#max - this.#min) * (position / this.offsetWidth);
    } else {
      this.#thumb.style.left = `${position}px`;
      this.#activeTrack.style.width = `${position}px`;
      this.#inactiveTrack.style.left = `${position}px`;
    }

    this.#updateMarks();
  }

  // TODO swipe close
  #onDragEnd({ distance }) {
    if (this.#isDiscrete === true) return;

    let percent = (this.#dragStartLeftPosition + distance.x) / this.offsetWidth;
    if (percent <= 0) percent = 0;
    if (percent >= 1) percent = 1;
    this.#value = this.#roundByStep(this.#min + (this.#max - this.#min) * percent);

    // TODO should i snap the position of the thumb when not using discrete
  }

  #roundByStep(value) {
    const inverse = 1 / this.#step;
    return Math.round(value * inverse) / inverse;
  }

  template() {
    return /* html */`
      <div class="mdw-track-inactive"></div>
      <div class="mdw-track-active"></div>

      <div class="mdw-marks">
        ${!this.#isDiscrete ? '' : [...new Array(this.#stepCount)].map(i => `<div class="mdw-mark"></div>`).join('\n')}
      </div>

      <div class="mdw-thumb"></div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});

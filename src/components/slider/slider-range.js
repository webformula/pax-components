import HTMLElementExtended from '../HTMLElementExtended.js';
import Drag from '../../core/drag.js';
import styleAsString from '!!css-loader!./slider-range.css?raw';

customElements.define('mdw-slider-range', class MDWSliderRange extends HTMLElementExtended {
  useShadowRoot = true;

  #min = 0;
  #max = 100;
  #value = [30,60];
  #step = 1;
  #dragOne = new Drag(this);
  #onDragOne_bound = this.#onDragOne.bind(this);
  #onDragOneStart_bound = this.#onDragOneStart.bind(this);
  #dragTwo = new Drag(this);
  #onDragTwo_bound = this.#onDragTwo.bind(this);
  #onDragTwoStart_bound = this.#onDragTwoStart.bind(this);
  #onclick_bound = this.#onclick.bind(this);
  #dragOneStartLeftPosition;
  #dragTwoStartLeftPosition;
  #activeTrack;
  #inactiveTrack;
  #inactiveTrack2;
  #thumb;
  #thumb2;
  #labelOne;
  #labelTwo;
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
    this.#inactiveTrack = this.shadowRoot.querySelector('.mdw-track-inactive.mdw-one');
    this.#inactiveTrack2 = this.shadowRoot.querySelector('.mdw-track-inactive.mdw-two');
    this.#thumb = this.shadowRoot.querySelector('.mdw-thumb.mdw-one');
    this.#thumb2 = this.shadowRoot.querySelector('.mdw-thumb.mdw-two');
    this.#labelOne = this.shadowRoot.querySelector('.mdw-thumb.mdw-one .mdw-label-text');
    this.#labelTwo = this.shadowRoot.querySelector('.mdw-thumb.mdw-two .mdw-label-text');
    this.#setPositionOne({ percent: this.percents[0] });
    this.#setPositionTwo({ percent: this.percents[1] });

    this.#dragOne = new Drag(this.#thumb);
    this.#dragOne.includeMouseEvents = true;
    this.#dragOne.onDrag(this.#onDragOne_bound);
    this.#dragOne.onStart(this.#onDragOneStart_bound);
    this.#dragOne.enable();

    this.#dragTwo = new Drag(this.#thumb2);
    this.#dragTwo.includeMouseEvents = true;
    this.#dragTwo.onDrag(this.#onDragTwo_bound);
    this.#dragTwo.onStart(this.#onDragTwoStart_bound);
    this.#dragTwo.enable();

    this.#inactiveTrack.addEventListener('click', this.#onclick_bound);
    this.#inactiveTrack2.addEventListener('click', this.#onclick_bound);
    this.#activeTrack.addEventListener('click', this.#onclick_bound);
  }

  disconnectedCallback() {
    this.#dragOne.destroy();
    this.#dragTwo.destroy();
    this.#inactiveTrack.removeEventListener('click', this.#onclick_bound);
    this.#inactiveTrack2.removeEventListener('click', this.#onclick_bound);
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
    return `${this.#value.join(',')}`;
  }
  set value(value = '30,60') {
    const split = value.split(',');
    this.#value = [parseFloat(split[0] || this.#min), parseFloat(split[1] || this.#max)];
    this.#adjustValueOnParams();
  }

  get valueArray() {
    return this.#value;
  }

  set value(value = '30,60') {
    const split = value.split(',');
    this.#value = [parseFloat(split[0] || this.#min), parseFloat(split[1] || this.#max)];
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

  get percents() {
    return [
      (this.#value[0] - this.#min) / (this.#max - this.#min),
      (this.#value[1] - this.#min) / (this.#max - this.#min)
    ];
  }

  get #stepCount() {
    return Math.floor((this.#max - this.#min) / this.#step) + 1;
  }

  #setValueOneFromPixels(pixels) {
    const thumb2X = this.#thumb2.getBoundingClientRect().x - this.getBoundingClientRect().x;
    if (pixels >= thumb2X - 10) {
      pixels = thumb2X - 10;
    }

    let percent = pixels / this.offsetWidth;
    if (percent <= 0) percent = 0;
    if (percent >= 1) percent = 1;

    const lastValue = this.#value[0];
    this.#value[0] = this.#roundByStep(this.#min + (this.#max - this.#min) * percent);

    if (lastValue !== this.#value[0]) this.dispatchEvent(new Event('change'));

    // this will snap to marks
    if (this.#isDiscrete) pixels = this.offsetWidth * this.percents[0];
    this.#setPositionOne({ pixels });
  }

  #setValueTwoFromPixels(pixels) {
    const thumbX = this.#thumb.getBoundingClientRect().x - this.getBoundingClientRect().x;
    if (pixels <= thumbX + 30) {
      pixels = thumbX + 30;
    }
    let percent = pixels / this.offsetWidth;
    if (percent <= 0) percent = 0;
    if (percent >= 1) percent = 1;

    const lastValue = this.#value[1];
    this.#value[1] = this.#roundByStep(this.#min + (this.#max - this.#min) * percent);

    if (lastValue !== this.#value[1]) this.dispatchEvent(new Event('change'));

    // this will snap to marks
    if (this.#isDiscrete) pixels = this.offsetWidth * this.percents[1];
    this.#setPositionTwo({ pixels });
  }

  #setPositionOne({ percent, pixels }) {
    if (percent) {
      if (percent > 1) throw Error('percent must be from 0 - 1');
      pixels = this.offsetWidth * percent;
    }
    if (pixels < 0) pixels = 0;
    const thumb2X = this.#thumb2.getBoundingClientRect().x - this.getBoundingClientRect().x;
    if (pixels >= thumb2X) pixels = thumb2X - 1;

    this.#thumb.style.left = `${pixels}px`;
    this.#activeTrack.style.left = `${pixels}px`;
    this.#inactiveTrack.style.width = `${pixels}px`;

    this.#updateNotches();
    this.#labelOne.innerHTML = this.#value[0];
  }

  #setPositionTwo({ percent, pixels }) {
    if (percent) {
      if (percent > 1) throw Error('percent must be from 0 - 1');
      pixels = this.offsetWidth * percent;
    }
    const thumbX = this.#thumb.getBoundingClientRect().x - this.getBoundingClientRect().x;
    if (pixels <= thumbX) pixels = thumbX + 1;
    if (pixels > this.offsetWidth) pixels = this.offsetWidth;

    this.#thumb2.style.left = `${pixels}px`;
    this.#activeTrack.style.right = `${this.offsetWidth - pixels}px`;
    this.#inactiveTrack2.style.left = `${pixels}px`;

    this.#updateNotches();
    this.#labelTwo.innerHTML = this.#value[1];
  }

  #adjustValueOnParams() {
    if (this.#value[0] < this.#min) this.#value[0] = this.#min;
    if (this.#value[0] >= this.#value[1]) this.#value[0] = this.#value[1] - this.#step;
    this.#value[0] = this.#roundByStep(this.#value[0]);
    this.#value[1] = this.#roundByStep(this.#value[1]);
    if (this.#value[1] > this.#max) this.#value[1] = this.#max;

    if (this.rendered) {
      this.#setPositionOne({ percent: this.percents[0] });
      this.#setPositionTwo({ percent: this.percents[1] });
    }
  }

  #roundByStep(value) {
    const inverse = 1 / this.#step;
    return Math.round(value * inverse) / inverse;
  }

  #updateNotches() {
    if (!this.#isDiscrete) return;

    const marks = [...this.shadowRoot.querySelectorAll('.mdw-mark')];
    const thumbX = this.#thumb.getBoundingClientRect().x;
    const thumbTwoX = this.#thumb2.getBoundingClientRect().x;
    marks.forEach(mark => {
      if (mark.getBoundingClientRect().x >= thumbX && mark.getBoundingClientRect().x <= thumbTwoX) {
        mark.classList.remove('mdw-inactive');
        mark.classList.add('mdw-active');
      } else {
        mark.classList.remove('mdw-active');
        mark.classList.add('mdw-inactive');
      }
    });
  }


  #onclick(event) {
    const thumbDistance = Math.abs(this.#thumb.getBoundingClientRect().x - event.clientX);
    const thumb2Distance = Math.abs(this.#thumb2.getBoundingClientRect().x - event.clientX);

    if (thumbDistance <= thumb2Distance) this.#setValueOneFromPixels(event.clientX - this.getBoundingClientRect().x);
    else this.#setValueTwoFromPixels(event.clientX - this.getBoundingClientRect().x);
  }

  #onDragOneStart() {
    // there is a margin offset of -10px on the thumb.
    this.#dragOneStartLeftPosition = this.#thumb.getBoundingClientRect().x - this.getBoundingClientRect().x + 10;
  }

  #onDragOne({ distance }) {
    this.#setValueOneFromPixels(this.#dragOneStartLeftPosition + distance.x);
  }

  #onDragTwoStart() {
    // there is a margin offset of -10px on the thumb.
    this.#dragTwoStartLeftPosition = this.#thumb2.getBoundingClientRect().x - this.getBoundingClientRect().x + 10;
  }

  #onDragTwo({ distance }) {
    this.#setValueTwoFromPixels(this.#dragTwoStartLeftPosition + distance.x);
  }

  template() {
    return /* html */`
      <div class="mdw-track-inactive mdw-one"></div>
      <div class="mdw-track-inactive mdw-two"></div>
      <div class="mdw-track-active"></div>

      <div class="mdw-marks">
        ${!this.#isDiscrete ? '' : [...new Array(this.#stepCount)].map(i => `<div class="mdw-mark"></div>`).join('\n')}
      </div>

      <div class="mdw-thumb mdw-one">
        <div class="mdw-label"><div class="mdw-label-text"></div></div>
      </div>
      <div class="mdw-thumb mdw-two">
        <div class="mdw-label"><div class="mdw-label-text"></div></div>
      </div>

      <style>
        ${styleAsString}
      </style>
    `;
  }
});

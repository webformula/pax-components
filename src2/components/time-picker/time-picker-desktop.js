import MDWPanelElement from '../panel/component.js';
import './time-picker-desktop.css';


customElements.define('mdw-time-picker-desktop', class MDWTimePickerDesktopElement extends MDWPanelElement {
  useTemplate = false;

  #close_bound = this.#close.bind(this);
  #onShow_bound = this.#onShow.bind(this);

  constructor() {
    super();

    this.animation = 'scale';
    this.backdrop = false;
    this.clickOutsideClose = true;
    this.target = this.parentElement.control;

    this.addClickOutsideCloseIgnore(this.parentElement.control);
  }

  afterRender() {
    this.addEventListener('open', this.#onShow_bound);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('open', this.#onShow_bound);
  }


  get #value() {
    return this.parentElement.value;
  }
  set #value(value) {
    this.parentElement.value = value;
  }

  get #displayTime() {
    return this.parentElement.displayTime;
  }
  set #displayTime(value) {
    this.parentElement.displayTime = value;
  }

  get #initialValue() {
    return this.parentElement.initialValue;
  }

  set #valueTime(value) {
    this.parentElement.valueTime = value;
  }

  get #minTime() {
    return this.parentElement.minTime;
  }

  get #maxTime() {
    return this.parentElement.maxTime;
  }

  template() {
    return /*html*/`
    `;
  }

  #onShow() {
    // this.#updateDisplayDate(this.#displayDate, true);
  }

  #close() {
    this.close();
  }
});

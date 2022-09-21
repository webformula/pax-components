import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import './segmented-button.js';

customElements.define('mdw-segmented-button-group', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #multiSelect = this.classList.contains('mdw-multi-select');
  #onclick_bound = this.#onclick.bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.#onclick_bound);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onclick_bound);
  }

  // for multi select you will receive comma separated values "a,b"
  get value() {
    return [...this.querySelectorAll('mdw-segmented-button[selected]')].map(e => e.value).join(',');
  }
  // for multi select you can use comma separation "a,b"
  set value(value = '') {
    if (this.#multiSelect) return this.multiValue = value.split(',');

    let match;
    for (const element of this.querySelectorAll('mdw-segmented-button')) {
      if (element.value === value) match = element;
    }

    if (match) {
      this.deselect();
      match.setAttribute('selected', '');
    } else console.warn(`No match found for value "${value}". The value will not change`);
  }

  get multiValue() {
    return [...this.querySelectorAll('mdw-segmented-button[selected]')].map(e => e.value);
  }
  set multiValue(value = []) {
    [].concat(value).forEach(v => {
      let match;
      for (const element of this.querySelectorAll('mdw-segmented-button')) {
        if (element.value === v) match = element;
      }

      if (match) match.setAttribute('selected', '');
      else console.warn(`No match found for value "${v}". The value will not change`);
    });
  }

  deselect() {
    const currentSelected = this.querySelector('mdw-segmented-button[selected]');
    if (currentSelected) currentSelected.removeAttribute('selected');
  }

  #onclick(event) {
    if (this.#multiSelect) {
      if (event.target.hasAttribute('selected')) event.target.removeAttribute('selected');
      else event.target.setAttribute('selected', '');
      return;
    }

    this.deselect();
    event.target.setAttribute('selected', '');
  }
});

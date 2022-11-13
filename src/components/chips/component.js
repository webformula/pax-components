import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import './chip.js';


customElements.define('mdw-chip-group', class MDWChipGroup extends HTMLElementExtended {
  useShadowRoot = false;

  constructor() {
    super();
  }

  get value() {
    return [...this.querySelectorAll('mdw-chip[checked]')].map(v => v.getAttribute('value')).join(',');
  }

  set value(value) {
    const values = value.split(',').filter(v => !! v);

    [...this.querySelectorAll('mdw-chip')].forEach(element => {
      if (values.includes(element.getAttribute('value'))) element.setAttribute('checked', '');
      else element.removeAttribute('checked');
    });
  }
});

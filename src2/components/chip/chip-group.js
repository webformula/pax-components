import HTMLElementExtended from '../HTMLElementExtended.js';
import './chip-group.css';


// TODO figure out if we should add properties to dynamically interact with chips

customElements.define('mdw-chip-group', class MDWChipGroupElement extends HTMLElementExtended {
  #value = '';
  
  constructor() {
    super();
  }

  get value() {
    const checked = [...this.querySelectorAll('mdw-chip[checked]')];
    if (checked.length === 0) this.#value = '';
    else this.#value = checked.map(e => e.value).filter(v => !!v).join(',');
    return this.#value;
  }
});

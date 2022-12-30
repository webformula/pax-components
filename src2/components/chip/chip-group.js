import HTMLElementExtended from '../HTMLElementExtended.js';
import './chip-group.css';


// TODO figure out if we should add properties to dynamically interact with chips

customElements.define('mdw-chip-group', class MDWChipGroupElement extends HTMLElementExtended {
  #type = this.#getType();
  #value = '';
  
  constructor() {
    super();
  }

  get value() {
    if (this.#type === 'filter') {
      const checked = [...this.querySelectorAll('mdw-chip[checked]')];
      if (checked.length === 0) this.#value = '';
      else this.#value = checked.map(e => e.value).filter(v => !!v).join(',');
    }

    if (this.#type === 'input') {
      this.#value = [...this.querySelectorAll('mdw-chip')].map(v => v.value).join(' ');
    }

    return this.#value;
  }
  set value(value) {
    this.#value = value;
  }


  addSuggestion(value, label) {
    const chip = document.createElement('mdw-chip');
    chip.setAttribute('value', value);
    chip.innerHTML = label;
    this.insertAdjacentElement('beforeend', chip);
  }

  removeSuggestion(value) {
    const chip = this.querySelector(`mdw-chip[value="${value}"]`);
    if (chip) chip.remove();
  }

  #getType() {
    if (this.classList.contains('mdw-input')) return 'input';
    if (this.classList.contains('mdw-filter')) return 'filter';
    if (this.classList.contains('mdw-suggestion')) return 'suggestion';
    return 'assist';
  }
});

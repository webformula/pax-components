import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';
import './chip.js';

// TODO input editing value
// TODO figure out if we should add properties to dynamically interact with chips

customElements.define('mdw-chip-group', class MDWChipGroup extends HTMLElementExtended {
  useShadowRoot = false;

  #type;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#type = this.#getType();
  }

  get value() {
    if (this.classList.contains('mdw-type-input')) return [...this.querySelectorAll('mdw-chip')].map(v => v.getAttribute('value')).join(',');
    if (this.classList.contains('mdw-type-filter')) return [...this.querySelectorAll('mdw-chip[checked]')].map(v => v.getAttribute('value')).join(',');
    return [];
  }

  // TODO input set value
  set value(value) {
    if (this.classList.contains('mdw-type-filter')) {
      const values = value.split(',').filter(v => !!v);

      [...this.querySelectorAll('mdw-chip')].forEach(element => {
        if (values.includes(element.getAttribute('value'))) element.setAttribute('checked', '');
        else element.removeAttribute('checked');
      });
    } else {
      throw Error('Can only set value with type filter');
    }
  }

  get type() {
    return this.#type;
  }

  addChip(params = {
    label: '',
    value: '',
    leadingIcon: '',
    trailingIcon: '',
    clearButton: false,
    checkmark: false,
    checked: false // only for type filter
  }) {
    if (!params.label && !params.value) throw Error('params must contain label or value');
    const template = /*html*/`
      <mdw-chip value="${params.value || params.label}"${this.#type !== 'filter' || !params.checked ? '' : ' checked'}>
        ${!params.checkmark ? '' : `<mdw-icon class="mdw-check">${params.leadingIcon || 'check'}</mdw-icon>`}
        ${params.checkmark || !params.leadingIcon ? '' : `<mdw-icon>${params.leadingIcon}</mdw-icon>`}
        <div class="mdw-label">${params.label || params.value}</div>
        ${!params.clearButton ? '' : `<mdw-icon class="mdw-clear">${params.trailingIcon || 'clear'}</mdw-icon>`}
        ${params.clearButton || !params.trailingIcon ? '' : `<mdw-icon>${params.trailingIcon}</mdw-icon>`}
      </mdw-chip>
    `;

    this.insertAdjacentHTML('afterbegin', template);
  }

  #getType() {
    if (this.classList.contains('mdw-type-filter')) return 'filter';
    if (this.classList.contains('mdw-type-input')) return 'input';
    if (this.classList.contains('mdw-type-suggestion')) return 'suggestion';
    return 'assist';
  }
});

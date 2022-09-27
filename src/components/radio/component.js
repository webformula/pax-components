import HTMLElementExtended from '../HTMLElementExtended.js';
import util from '../../core/util.js';
import './component.css';

// TODO handle focus on panel close

customElements.define('mdw-radio-group', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #lastValue;
  #groupName = `mdw-radio-${util.getUID()}`;
  #onclick_bound = this.#onclick.bind(this);

  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    this.addEventListener('click', this.#onclick_bound);
    this.#lastValue = this.value;
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onclick_bound);
  }

  get value() {
    const checked = this.querySelector('input:checked');
    return checked ? checked.value : undefined;
  }

  set value(_value) {
    const match = this.querySelector(`input[value="${_value}"]`);
    if (match) match.checked = true;
  }

  #onclick(event) {
    if (event.target.classList.contains('mdw-radio-control')) {
      event.target.previousElementSibling.click();
    }
  }

  template() {
    const inputs = [...this.querySelectorAll('input')];
    if (inputs[0].hasAttribute('name')) this.#groupName = inputs[0].getAttribute('name')

    let labelPosition = 'next';
    if (inputs[0].previousElementSibling && inputs[0].previousElementSibling.nodeName === 'LABEL') labelPosition = 'previous';
    else if (inputs[0].parentNode && inputs[0].parentNode.nodeName === 'LABEL') labelPosition = 'parent';

    
    // backfill missing attributes and restructure for display
    const template = inputs.map(input => {
      let label;
      if (labelPosition === 'next') label = input.nextElementSibling;
      else if (labelPosition === 'parent') label = input.parentNode;
      else if (labelPosition === 'previous') label = input.previousElementSibling;

      const inputId = input.getAttribute('id') || `mdw-radio-input-${util.getUID()}`;
      input.setAttribute('id', inputId);
      input.setAttribute('name', this.#groupName);
      input.setAttribute('type', 'radio');

      if (label && label.nodeName === 'LABEL') {
        label.setAttribute('for', inputId);

        // make sure input is not added inside of the input
        if (labelPosition === 'parent') label.removeChild(input);
      } else label = undefined;

      return `
        <div class="mdw-radio">
          ${input.outerHTML}
          <div class="mdw-radio-control"></div>
          ${label ? label.outerHTML : ''}
        </div>
      `
    }).join('');

    return template;
  }
});

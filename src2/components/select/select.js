import MDWPanelElement from '../panel/component.js';
import './select.css';

// TODO (NOT SURE WHAT THIS. BAD FORM MY SELF) remove control click after checking on mobile
// TODO focus next broken with async search (arrow down multiple times after typing)

customElements.define('mdw-select', class MDWSelect extends MDWPanelElement {
  #textfield = this.parentElement;
  #input = this.parentNode.querySelector('input');
  #onInputFocus_bound = this.#onInputFocus.bind(this);

  constructor() {
    super();

    if (!this.#input) throw Error('No input found. mdw-select must be inside mdw-textfield');
    this.target = this.#textfield;
    this.animation = 'scale';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'select');

    this.style.minWidth = `${this.#textfield.offsetWidth}px`;
    this.#input.addEventListener('focus', this.#onInputFocus_bound);

    // fonts can cause input widths to change
    document.fonts.ready.then(() => {
      this.style.minWidth = `${this.#textfield.offsetWidth}px`;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#input.removeEventListener('focus', this.#onInputFocus_bound);
  }

  #onInputFocus() {
    this.show();
  }
});

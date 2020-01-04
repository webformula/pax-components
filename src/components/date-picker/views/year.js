import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-year', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_click = this.click.bind(this);
    this.today = MDWDateUtil.today();
    // TODO allow range to be set
    this.years = MDWDateUtil.defaultYearRange();
    this.cloneTemplate(true);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.mdw-date-picker--view-year-container').addEventListener('click', this.bound_click);
    this.scrollToSelectedYear();
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.mdw-date-picker--view-year-container').removeEventListener('click', this.bound_click);
  }

  static get observedAttributes() {
    return ['mdw-year'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-year':
        if (!newValue) return;

        this._selectedYear = newValue;
        this.updateDisplay();
        break;
    }
  }

  get year() {
    return this._selectedYear;
  }

  get selectedElement() {
    let selected = this.shadowRoot.querySelector('.mdw-selected');
    if (!selected) selected = this.shadowRoot.querySelector(`[mdw-year="${this.today.getFullYear()}"]`);
    return selected;
  }

  updateDisplay() {
    this.deslecet();
    const el = this.shadowRoot.querySelector(`[mdw-year="${this.year}"]`);
    if (el) el.classList.add('mdw-selected');
  }

  deslecet() {
    const selected = this.shadowRoot.querySelector(`.mdw-selected`);
    if (selected) selected.classList.remove('mdw-selected');
  }

  scrollToSelectedYear() {
    this.selectedElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  click(event) {
    this.deslecet();
    event.target.classList.add('mdw-selected');
    this.dispatchEvent(new CustomEvent('MDWDatePicker:yearChange', {
      detail: {
        year: parseInt(event.target.getAttribute('mdw-year'))
      }
    }));
  }

  template() {
    return `
      <div class="mdw-date-picker--view-year-container">
        ${this.years.map(y => `<div class="mdw-date-picker--year" mdw-year="${y}">${y}</div>`).join('\n')}
      </div>
    `;
  }

  styles() {
    return `
      :host {
        overflow-y: scroll;
      }

      .mdw-date-picker--view-year-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .mdw-date-picker--year {
        font-size: 15px;
        width: 64px;
        text-align: center;
        line-height: 32px;
        border-radius: 16px;
        margin: 12px 6px;
        cursor: pointer;
        color: var(--mdw-theme-text--heading);
      }

      .mdw-date-picker--year.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }
    `;
  }
});

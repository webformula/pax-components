import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month--mobile', class extends HTMLElementExtended {
  constructor() {
    super();

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.cloneTemplate(true);
  }

  connectedCallback() {
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        break;

      case 'mdw-selected-date':
        break;

      case 'mdw-min-date':
        break;

      case 'mdw-max-date':
        break;
    }
  }


  get displayDate() {
    return MDWDateUtil.parse(this.getAttribute('mdw-display-date') || this.today);
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date') || '';
  }

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  nextMonth() {
  }

  prevMonth() {
  }

  template() {
    return `
    `;
  }

  styles() {
    return `
    `;
  }
});

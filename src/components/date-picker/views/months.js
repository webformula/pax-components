import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';
import MDWUtils from '../../../core/Utils.js';

customElements.define('mdw-date-picker--view-month', class extends HTMLElementExtended {
  constructor() {
    super();

    this.cloneTemplate(true);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.monthElement.setAttribute('mdw-display-date', newValue);
        break;

      case 'mdw-selected-date':
        this.monthElement.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-min-date':
        this.monthElement.setAttribute('mdw-min-date', newValue);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date') || '';
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date') || '';
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get monthElement() {
    return this.shadowRoot.querySelector('[mdw-month-view]');
  }

  template() {
    if (MDWUtils.isMobile)return `<mdw-date-picker--view-month--desktop
                                    mdw-month-view
                                    mdw-display-date="${this.displayDate}"
                                    mdw-display-date="${this.selectedDate}"
                                    mdw-min-date="${this.minDate}"
                                    ></mdw-date-picker--view-month--desktop>`;

    return `<mdw-date-picker--view-month--desktop
              mdw-month-view
              mdw-display-date="${this.displayDate}"
              mdw-display-date="${this.selectedDate}"
              mdw-min-date="${this.minDate}"
              ></mdw-date-picker--view-month--desktop>`;
  }
});

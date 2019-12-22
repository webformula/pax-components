import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-year', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_click = this.click.bind(this);
    this.currentYear = MDWDateUtil.parse(this.selectedDate || MDWDateUtil.today()).getFullYear();
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

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get selectedElement() {
    return this.shadowRoot.querySelector('.mdw-selected');
  }

  scrollToSelectedYear() {
    this.selectedElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  click(event) {
    this.unSlecet();
    this.setSelected(event.target);
    this.dispatchEvent(new CustomEvent('MDWDatePicker:yearChanged', {
      detail: {
        year: event.target.getAttribute('id').replace('mdw-year-', '')
      }
    }));
  }

  getSelected() {
    return this.shadowRoot.querySelector('.mdw-selected');
  }

  unSlecet() {
    this.getSelected().classList.remove('mdw-selected');
  }

  setSelected(el) {
    el.classList.add('mdw-selected');
  }

  template() {
    return `
      <div class="mdw-date-picker--view-year-container">
        ${this.years.map(y => `<div id="mdw-year-${y}" class="mdw-date-picker--year ${y === this.currentYear ? 'mdw-selected' : ''}">${y}</div>`).join('\n')}
      </div>
    `;
  }

  styles() {
    return `
      .mdw-date-picker--view-year-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow-y: scroll;
        height: 320px;
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

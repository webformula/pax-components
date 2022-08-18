import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--year-view-button', class extends HTMLElementExtended {
  constructor() {
    super();
    this.dateObj = MDWDateUtil.today(MDWDateUtil.parse(this.displayDate || MDWDateUtil.today()));

    this.cloneTemplate({ rerender: true });
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get month() {
    return MDWDateUtil.format(this.dateObj, 'MMMM')
  }

  get year() {
    return MDWDateUtil.getYear(this.dateObj);
  }

  static get observedAttributes() {
    return ['mdw-display-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch (name) {
      case 'mdw-display-date':
        this.dateObj = MDWDateUtil.parse(newValue);
        this.updateDisplay();
        break;
    }
  }

  updateDisplay() {
    const month = this.month;
    const monthElement = this.shadowRoot.querySelector('.month');
    monthElement.style.width = `${this.getMonthWidth(month)}px`;
    monthElement.innerHTML = month;
    this.shadowRoot.querySelector('.year').innerHTML = this.year;
  }

  getMonthWidth(month) {
    switch (month.toLowerCase()) {
      case 'january':
        return 59;
      case 'february':
        return 64;
      case 'march':
        return 48;
      case 'april':
        return 36;
      case 'may':
        return 33;
      case 'june':
        return 38;
      case 'july':
        return 33;
      case 'august':
        return 54;
      case 'september':
        return 81;
      case 'october':
        return 60;
      case 'november':
        return 76;
      case 'december':
        return 76;
    }
  }

  template() {
    const month = this.month;
    return /* html */`
      <div>
        <span class="month" style="width: ${this.getMonthWidth(month)}px">${month}</span>
        <span class="year">${this.year}</span>
      </div>
      <i class="icon"></i>
    `;
  }

  styles() {
    return /* css */`
      :host {
        margin-left: 24px;
        position: relative;
        padding-right: 23px;
        cursor: pointer;
        color: var(--mdw-theme-text--body);
        display: flex;
        justify-content: space-between;
      }
      .month {
        display: inline-block;
        line-height: 13px;
        overflow: hidden;
        transition: width 110ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      .icon {
        right: 8px;
        top: 7px;
        width: 0;
        height: 0;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--mdw-theme-text--body);
      }
      :host(.mdw-open) .icon {
        transform: rotate(180deg) translateY(-5px);
        transform-origin: top;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
  }
});

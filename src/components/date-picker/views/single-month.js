import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month-single', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    // TODO remove defaulting
    this.today = MDWDateUtil.today();
    this.monthDate = MDWDateUtil.parse(this.getAttribute('mdw-date'));
    this.monthDays = this.monthDate ? MDWDateUtil.getMonthDayArray(this.monthDate) : [];

    this.cloneTemplate(true);

    if (MDWDateUtil.isSameYear(this.today, this.monthDate) && MDWDateUtil.isSameMonth(this.today, this.monthDate)) {
      this.setCurrent();
      this.setActive();
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }

  // expecting date string: (new Date()).toString();
  get year() {
    return this.monthDate.getFullYear();
  }

  get month() {
    return this.monthDate.getMonth();
  }

  get day() {
    return parseInt(this.shadowRoot.querySelector('.mdw-selected').innerHTML)
  }

  // parent component
  get parentComponent() {
    return this._parentComponent;
  }

  set parentComponent(el) {
    this._parentComponent = el;
  }

  setDate(dateParts) {
    this.parentComponent.setDate(dateParts);
  }

  updateDisplay(date) {
    // only update if the year and month match;
    if (date.getFullYear() !== this.year || date.getMonth() !== this.month) return;

    this.monthDate = date;
    console.log(date.getDate());
    this.shadowRoot.querySelectorAll('.mdw-date-picker--day')[date.getDate() - 1].classList.add('mdw-selected');
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  setCurrent() {
    this.setAttribute('mdw-current-month', '');
  }

  setActive() {
    this.setAttribute('mdw-active-month', '');
  }

  removeActive() {
    this.removeAttribute('mdw-active-month');
  }

  onClick(event) {
    if (event.target.classList.contains('mdw-date-picker--day')) {
      this.parentComponent.deselect();
      event.target.classList.add('mdw-selected');
      this.setDate({
        year: this.year,
        month: this.month,
        day: this.day,
        updateDate: true
      });
    }
  }

  template() {
    return `
      <div class="mdw-date-picker--view-month-container">
        ${this.monthDays.map(week => `
          <div class="mdw-date-picker--view-month-week-container">
            ${week.map(d => `<div class="mdw-date-picker--day">${d}</div>`).join('\n')}
          </div>
        `).join('\n')}
      </div>
    `;
  }

  styles() {
    return `
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .mdw-date-picker--view-month-container {
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 12px;
        flex: 1;
        display: flex;
        flex-direction: column;
        width: calc(100% - 12px);
      }

      .mdw-date-picker--view-month-week-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .mdw-date-picker--day {
        font-size: 13px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        color: var(--mdw-theme-text--heading);
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
      }

      .mdw-date-picker--day.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }

      .mdw-date-picker--day.mdw-today {
        border: 1px solid var(--mdw-theme-foreground);
      }
    `;
  }
});

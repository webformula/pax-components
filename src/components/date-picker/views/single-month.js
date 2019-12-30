import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month-single', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    this.today = MDWDateUtil.today();
    this.monthDate = MDWDateUtil.parse(this.date);
    this.monthDays = this.monthDate ? MDWDateUtil.getMonthDayArray(this.monthDate) : [];

    this.cloneTemplate(true);

    if (MDWDateUtil.isSameYear(this.today, this.monthDate) && MDWDateUtil.isSameMonth(this.today, this.monthDate)) {
      const todayElement = this.shadowRoot.querySelector(`[mdw-day="${this.today.getDate()}"]`);
      if (todayElement) todayElement.classList.add('mdw-today');
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }

  get date() {
    return this.getAttribute('mdw-date');
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

  updateDisplay(displayDate, selectedDate) {
    // only update if the year and month match;
    this.deselect();
    if (displayDate.getFullYear() !== this.year || displayDate.getMonth() !== this.month) return;

    this.setCurrent();
    if (selectedDate) this.setDay(selectedDate.getDate());
  }

  deselect() {
    this.setCurrent(false);
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  setCurrent(value = true) {
    this.toggleAttribute('mdw-current-month', !!value);
  }

  setDay(day) {
    const selectedElement = this.shadowRoot.querySelector(`[mdw-day="${day}"]`);
    if (selectedElement) selectedElement.classList.add('mdw-selected');
  }

  onClick(event) {
    if (event.target.classList.contains('mdw-date-picker--day')) {
      event.target.classList.add('mdw-selected');
      this.parentComponent.dispatchChange({
        year: this.year,
        month: this.month,
        day: this.day
      });
    }
  }

  template() {
    return `
      <div class="mdw-date-picker--view-month-container">
        ${this.monthDays.map(week => `
          <div class="mdw-date-picker--view-month-week-container">
            ${week.map(d => `<div class="mdw-date-picker--day" mdw-day="${d}">${d}</div>`).join('\n')}
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

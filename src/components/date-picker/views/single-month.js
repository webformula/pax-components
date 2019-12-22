import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month-single', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    // TODO remove defaulting
    this.today = MDWDateUtil.today();
    this.monthDate = MDWDateUtil.parse(this.date);
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
  get date() {
    return this.getAttribute('mdw-date');
  }

  get selectedDate() {
    return this.parentNode.selectedDate;
  }

  // parent component
  get monthsElement() {
    return this._monthsComponent;
  }
  set monthsComponent(el) {
    this._monthsComponent = el;
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  isSelectedMonth() {
    return this.selectedDate && this.selectedDate.getMonth() === this.monthDate.getMonth();
  }

  isToday(day) {
    return this.today.getMonth() === this.monthDate.getMonth() && day === this.today.getDate();
  }

  isSelected(day) {
    return this.isSelectedMonth() && day === this.selectedDate.getDate();
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
      this.monthsElement.deselect();
      event.target.classList.add('mdw-selected');
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthDayChanged', {
        detail: {
          month: this.monthDate.getMonth(),
          day: parseInt(event.target.innerHTML)
        }
      }));
    }
  }

  template() {
    return `
      <div class="mdw-date-picker--view-month-container">
        ${this.monthDays.map(week => `
          <div class="mdw-date-picker--view-month-week-container">
            ${week.map(d => `<div class="mdw-date-picker--day ${this.isSelected(d) ? 'mdw-selected' : ''} ${this.isToday(d) ? 'mdw-today' : ''}">${d}</div>`).join('\n')}
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

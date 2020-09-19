
import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';
import MDWUtils from '../../../core/Utils.js';

// TODO update change (month, day year) events to be updateDate and selectDate

customElements.define('mdw-date-picker--month-days', class extends HTMLElementExtended {
  constructor() {
    super();

    if (MDWUtils.isMobile) this.classList.add('mdw-mobile');
    this.bound_onClick = this.onClick.bind(this);
    this.today = MDWDateUtil.today();
    this._setupDate();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  removeEvents() {
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch (name) {
      case 'mdw-min-date':
      case 'mdw-max-date':
      case 'mdw-display-date':
        this._setupDate();
        this.render();
        break;

      case 'mdw-selected-date':
        this._selectDate(newValue);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  get shouldFillMonth() {
    return this.hasAttribute('mdw-fill-month');
  }

  _setupDate() {
    this.monthDate = MDWDateUtil.parse(this.displayDate);
    this.monthDays = this.monthDate ? MDWDateUtil.getMonthDayArray(this.monthDate, {
      fillInMonth: this.shouldFillMonth,
      minDate: MDWDateUtil.parse(this.minDate),
      maxDate: MDWDateUtil.parse(this.maxDate)
    }) : [];
  }

  _selectDate(dateString) {
    const date = MDWDateUtil.parse(dateString);
    // TODO do i need to deselect on invalid dates?
    if (!MDWDateUtil.isValid(date)) return;

    this.deselect();
    // date does not match month and year
    if (MDWDateUtil.getYear(date) !== MDWDateUtil.getYear(this.monthDate) || MDWDateUtil.getMonth(date) !== MDWDateUtil.getMonth(this.monthDate)) return;

    const selectedElement = this.shadowRoot.querySelector(`[mdw-date="${MDWDateUtil.format(date, 'YYYY-MM-dd')}"]`);
    if (selectedElement) selectedElement.classList.add('mdw-selected');
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  onClick(event) {
    if (!event.target.classList.contains('mdw-date-picker--day') || !event.target.classList.contains('mdw-interactable') || event.target.classList.contains('mdw-out-of-range')) return;

    this.deselect();
    const { year, month, day } = MDWDateUtil.getParts(MDWDateUtil.parse(event.target.getAttribute('mdw-date')));
    this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
      composed: true,
      detail: { year, month, day }
    }));
  }

  template() {
    const selectedDateParts = this.selectedDate && MDWDateUtil.getParts(new Date(this.selectedDate));
    return /* html */`
      <div class="container">
        ${this.monthDays.map(week => `
          ${week.map(({ display, date, currentMonth, interactable, beforeMinDate, afterMaxDate, isToday }) => {
            let classes = 'mdw-date-picker--day';
            let { year, month, day} = MDWDateUtil.getParts(new Date(date));
            if (beforeMinDate) classes += ' mdw-before-min-date';
            if (afterMaxDate) classes += ' mdw-after-max-date';
            if (interactable) classes += ' mdw-interactable';
            if (beforeMinDate || afterMaxDate) classes += ' mdw-out-of-range';
            if (isToday && display !== '') classes += ' mdw-today';
            if (!currentMonth) classes += ' mdw-next-month';
            if (selectedDateParts && selectedDateParts.year === year && selectedDateParts.month === month && selectedDateParts.day === day) classes += ' mdw-selected';
            return /* html */`<div class="${classes}" mdw-date="${MDWDateUtil.format(date, 'YYYY-MM-dd')}">${display}</div>`;
          }).join('\n')}
        `).join('')}
      </div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        pointer-events: none;
      }
      :host(.mdw-active-month) {
        pointer-events: auto;
      }
      .container {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 28px);
        grid-column-gap: 4px;
        grid-row-gap: 0px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
      }
      :host(.mdw-mobile) .container {
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(6, 36px);
        grid-column-gap: 4px;
        padding: 0 12px;
      }
      .mdw-date-picker--day {
        font-size: 13px;
        color: var(--mdw-theme-on-primary);
        user-select: none;
        box-sizing: border-box;
        cursor: pointer;
        pointer-events: none;
        position: relative;
        text-align: center;
        padding: 6px;
      }
      .mdw-date-picker--day:before {
        content: "";
        width: 28px;
        height: 28px;
        position: absolute;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
        border-radius: 50%;
        z-index: -1;
      }
      .mdw-date-picker--day.mdw-interactable {
        cursor: pointer;
        pointer-events: auto;
      }
      .mdw-date-picker--day.mdw-out-of-range {
        color: rgb(140,120,120);
        pointer-events: none;
        cursor: auto;
      }
      .mdw-date-picker--day.mdw-next-month {
        color: rgb(140,140,140);
      }
      .mdw-date-picker--day.mdw-next-month.mdw-out-of-range {
        color: rgb(140,120,120);
      }
      .mdw-date-picker--day.mdw-selected {
        color: var(--mdw-theme-text-primary-on-background);
      }
      .mdw-date-picker--day.mdw-selected:before {
        background-color: var(--mdw-theme-primary);
      }
      .mdw-date-picker--day.mdw-today:before {
        border: 1px solid rgb(var(--mdw-theme-on-background--rgb), 0.3);
      }
    `;
  }
});

import BaseDatePickerElement from '../BaseDatePickerElement.js';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-scroll-view-mobile', class extends BaseDatePickerElement {
  constructor() {
    super();

    this.months = MDWDateUtil.getYearMonthDays({
      date: this.displayDate,
      minDate: this.minDate,
      maxDate: this.maxDate
    });
    this.cloneTemplate({ rerender: true });
  }

  template() {
    return /*html*/ `
      ${this.months.map(month => this._buildMonth(month)).join('')}
    `;
  }

  _buildMonth(month) {
    let selectedDay;
    const selectedDate = this.selectedDate;
    if (selectedDate) {
      const isMatch = MDWDateUtil.matchYearAndMonth(this.displayDate, selectedDate);
      if (isMatch) selectedDay = selectedDate.getDate();
    }

    return /*html*/`
      <div class="month-days">
        ${month.map(week => `
          ${week.map(day => this._buildDay(selectedDay, day)).join('')}
        `).join('')}
      </div>
    `;
  }

  _buildDay(selectedDay, { display, date, currentMonth, outOfRange, beforeMinDate, afterMaxDate, isToday }) {
    let classes = 'single-day';
    if (beforeMinDate) classes += ' before-min-date';
    if (afterMaxDate) classes += ' after-max-date';
    if (outOfRange) classes += ' interactable';
    if (beforeMinDate || afterMaxDate) classes += ' out-of-range';
    if (isToday && display !== '') classes += ' today';
    if (!currentMonth) classes += ' next-month';
    if (selectedDay && selectedDay === date.getDate()) classes += ' selected';
    return /* html */`<div class="${classes}" mdw-date="${MDWDateUtil.format(date, 'YYYY-MM-dd')}">${display}</div>`;
  }

  styles() {
    return /*css*/`
      :host {
        display: flex;
        flex-direction: column;
      }

      .month-days {
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 28px);
        grid-column-gap: 4px;
        grid-row-gap: 0px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;

        width: 280px;
        height: 184px;
      }

      .single-day {
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

      .single-day:before {
        content: "";
        width: 28px;
        height: 28px;
        position: absolute;
        top: calc(50% - 14px);
        left: calc(50% - 14px);
        border-radius: 50%;
        z-index: -1;
      }

      .single-day.interactable {
        cursor: pointer;
        pointer-events: auto;
      }
      .single-day.out-of-range {
        color: rgb(140,120,120);
        pointer-events: none;
        cursor: auto;
      }
      .single-day.selected {
        color: var(--mdw-theme-text-primary-on-background);
      }
      .single-day.selected:before {
        background-color: var(--mdw-theme-primary);
      }
      .single-day.today:before {
        border: 1px solid rgb(var(--mdw-theme-on-background--rgb), 0.3);
      }
    `;
  }
});

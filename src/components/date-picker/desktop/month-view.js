import BaseDatePickerElement from '../BaseDatePickerElement.js';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-month-view-desktop', class extends BaseDatePickerElement {
  constructor() {
    super();

    this.bound_onClick = this._onClick.bind(this);
    this.bound_nextMonth = this._nextMonth.bind(this);
    this.bound_previousMonth = this._previousMonth.bind(this);
    this.bound_showYearView = this._showYearView.bind(this);
    
    // setup date
    this.showPreviousMonthDays = false;
    this.showNextMonthDays = true;
    this.monthDays = MDWDateUtil.getMonthDayArray({
      date: this.displayDate,
      showNextMonthDays: this.showNextMonthDays,
      showPreviousMonthDays: this.showPreviousMonthDays,
      minDate: this.minDate,
      maxDate: this.maxDate
    });

    this.cloneTemplate({ rerender: true });
  }

  get monthName() {
    return MDWDateUtil.format(this.displayDate, 'MMMM')
  }

  get year() {
    return MDWDateUtil.getYear(this.displayDate);
  }

  addEvents() {
    this.shadowRoot.querySelector('.show-year-view-button').addEventListener('click', this.bound_showYearView);
    this.shadowRoot.querySelector('.next-month').addEventListener('click', this.bound_nextMonth);
    this.shadowRoot.querySelector('.previous-month').addEventListener('click', this.bound_previousMonth);
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  removeEvents() {
    this.shadowRoot.querySelector('.show-year-view-button').removeEventListener('click', this.bound_showYearView);
    this.shadowRoot.querySelector('.next-month').removeEventListener('click', this.bound_nextMonth);
    this.shadowRoot.querySelector('.previous-month').removeEventListener('click', this.bound_previousMonth);
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }


  _onClick(event) {
    if (!event.target.classList.contains('single-day') || !event.target.classList.contains('interactable') || event.target.classList.contains('out-of-range')) return;
    this.dispatchEvent(new CustomEvent('MDWDatePicker:dateSelected', {
      composed: true,
      detail: MDWDateUtil.parse(event.target.getAttribute('mdw-date'))
    }));
  }

  _nextMonth() {
    this._changeMonth(1);
  }

  _previousMonth() {
    this._changeMonth(-1);
  }

  _changeMonth(direction) {
    const newDate = MDWDateUtil.adjustDate(this.displayDate, { add: { month: direction } });
    this.dispatchEvent(new CustomEvent('MDWDatePicker:displayDateChange', {
      composed: true,
      detail: newDate
    }));
  }

  _updateDisplayDate() {
    this._updateMonthAndYear();
    this._updateDays()
  }

  _updateSelectedDate() {
    const selected = this.shadowRoot.querySelector('.selected');
    if (selected) selected.classList.remove('selected');

    const date = MDWDateUtil.parse(this.selectedDate);
    const selectedElement = this.shadowRoot.querySelector(`[mdw-date="${MDWDateUtil.format(date, 'YYYY-MM-dd')}"]`);
    if (selectedElement) selectedElement.classList.add('selected');
  }

  _updateMonthAndYear() {
    const monthName = this.monthName;
    const monthElement = this.shadowRoot.querySelector('.month');
    monthElement.style.width = `${this._getMonthWidth(monthName)}px`;
    monthElement.innerHTML = monthName;
    this.shadowRoot.querySelector('.year').innerHTML = this.year;
  }

  _updateMinDate() {
    this._updateDisplayDate(true);
  }

  _updateMaxDate() {
    this._updateDisplayDate(true);
  }

  _updateDays(force = false) {
    if (force !== true && this.selectedDate && !MDWDateUtil.match(this.selectedDate, this.currentSelectedDate) && MDWDateUtil.matchYearAndMonth(this.selectedDate, this.currentSelectedDate)) return;
    if (force !== true && !MDWDateUtil.match(this.displayDate, this.currentDisplayDate) && MDWDateUtil.matchYearAndMonth(this.displayDate, this.currentDisplayDate)) return;

    const displayDate = this.displayDate;
    this.monthDays = MDWDateUtil.getMonthDayArray({
      date: displayDate,
      showNextMonthDays: this.showNextMonthDays,
      showPreviousMonthDays: this.showPreviousMonthDays,
      minDate: this.minDate,
      maxDate: this.maxDate
    });
    const currentElement = this.shadowRoot.querySelector('.month-days');
    currentElement.classList.add('current');
    const direction = displayDate > this.currentDisplayDate ? 1 : -1;

    this.shadowRoot.querySelector('.days-container').insertAdjacentHTML(direction === 1 ? 'beforeend' : 'afterbegin', this._buildDaysTemplate(direction === 1 ? 'move-right' : 'move-left'));

    const current = this.shadowRoot.querySelector('.month-days.current');
    const next = this.shadowRoot.querySelector('.month-days:not(.current)');

    // prep animations
    next.style.opacity = '0';

    requestAnimationFrame(() => {
      current.classList.add(direction === 1 ? 'move-left' : 'move-right');
      current.style.opacity = '0';
      next.classList.remove(direction === 1 ? 'move-right' : 'move-left')
      next.style.opacity = '1';

      const that = this;
      current.addEventListener(MDWUtils.transitionEventName, function handler() {
        current.remove();
        that._updateSelectedDate();
      });
    });
  }

  _getMonthWidth() {
    switch (this.monthName.toLowerCase()) {
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

  _showYearView() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:showYearView', {
      composed: true
    }));
  }

  template() {
    return /* html */`
      <div class="controls-container">
        <div class="show-year-view-button">
          <span class="month" style="width: ${this._getMonthWidth()}px">${this.monthName}</span>
          <span class="year">${this.year}</span>
        </div>

        <div>
          <mdw-button class="mdw-icon previous-month">
            <mdw-icon>keyboard_arrow_left</mdw-icon>
          </mdw-button>
          <mdw-button class="mdw-icon next-month">
            <mdw-icon>keyboard_arrow_right</mdw-icon>
          </mdw-button>
        </div>
      </div>
      <div class="days-container">
        ${this._buildDaysTemplate()}
      </div>
    `;
  }

  _buildDaysTemplate(className = '') {
    let selectedDay;
    const selectedDate = this.selectedDate;
    if (selectedDate) {
      const isMatch = MDWDateUtil.matchYearAndMonth(this.displayDate, selectedDate);
      if (isMatch) selectedDay = selectedDate.getDate();
    }

    return /*html*/`
      <div class="month-days ${className}">
        ${this.monthDays.map(week => `
          ${week.map(day => this._buildDay(selectedDay, day)).join('\n')}
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
    return /* css */`
      :host {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .days-container {
        overflow: hidden;
        position: relative;
        height: 184px;
        width: 280px;
      }

      .month-days {
        position: absolute;
        display: grid;
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 28px);
        grid-column-gap: 4px;
        grid-row-gap: 0px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
        transform: translateX(0);
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
        opacity: 1;
      }

      .month-days.move-left {
        transform: translateX(-16px);
      }

      .month-days.move-right {
        transform: translateX(16px);
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
      .single-day.next-month {
        color: rgb(140,140,140);
      }
      .single-day.next-month.out-of-range {
        color: rgb(140,120,120);
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

      .controls-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left: 24px;
        position: relative;
        padding-right: 23px;
        cursor: pointer;
        color: var(--mdw-theme-text--body);
      }

      .month {
        display: inline-block;
        line-height: 13px;
        overflow: hidden;
        transition: width 110ms cubic-bezier(0.4, 0, 0.2, 1);
      }

      .show-year-view-button {
        cursor: pointer;
      }

      show-year-view-button > span {
        pointer-events: none;
      }
    `;
  }
});

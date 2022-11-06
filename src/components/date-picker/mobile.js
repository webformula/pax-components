import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import Drag from '../../core/drag.js';
import './mobile.css';

// TODO orientation

customElements.define('mdw-date-picker-mobile', class MDWDatePickerMobile extends HTMLElementExtended {
  useShadowRoot = false;

  #drag = new Drag();
  #datePickerComponent;
  #displayDate = '';
  #currentValue = '';
  #min;
  #max;
  #previousMonthClick_bound = this.#previousMonthClick.bind(this);
  #nextMonthClick_bound = this.#nextMonthClick.bind(this);
  #dayClick_bound = this.#dayClick.bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#datePickerComponent = document.querySelector(`#${this.getAttribute('mdw-date-picker-id')}`);
    this.#displayDate = this.#datePickerComponent.displayDate;
    this.#currentValue = this.#datePickerComponent.value || dateUtil.format(this.#displayDate, 'YYYY-MM-dd');
    this.#min = this.#datePickerComponent.min && dateUtil.parse(this.#datePickerComponent.min);
    this.#max = this.#datePickerComponent.max && dateUtil.parse(this.#datePickerComponent.max);
    this.render();
  }

  afterRender() {
    this.querySelector('.mdw-month-previous').addEventListener('click', this.#previousMonthClick_bound);
    this.querySelector('.mdw-month-next').addEventListener('click', this.#nextMonthClick_bound);
    this.querySelector('.mdw-months-container').addEventListener('click', this.#dayClick_bound);
  }

  setDisplayDate(date) {
    this.#updateDisplayDate(date, true, true);
  }

  setMinDate(date) {
    this.#min = date && dateUtil.parse(date);
    this.#updateDisplayDate();
  }

  setMaxDate(date) {
    this.#max = date && dateUtil.parse(date);
    this.#updateDisplayDate();
  }

  #updateDisplayDate(date, render = true, updateDaySelection = false) {
    this.#displayDate = date;
    this.#datePickerComponent.setDisplayDate(date);

    this.querySelector('.mdw-year-label').innerHTML = dateUtil.format(date, 'MMMM YYYY');
    const parts = dateUtil.getParts(date);
    // const selectedYear = this.querySelector('.mdw-year[selected]');
    // if (selectedYear) selectedYear.removeAttribute('selected');
    const displayYear = this.querySelector(`.mdw-year[year="${parts.year}"]`);
    if (displayYear) displayYear.setAttribute('selected', '');

    if (render) {
      const active = this.querySelector('.mdw-month.mdw-active');
      active.innerHTML = this.#monthDaysTemplate();
      const previous = this.querySelector('.mdw-month.mdw-previous');
      previous.innerHTML = this.#monthDaysTemplate(dateUtil.addToDateByParts(date, { month: -1 }));
      const next = this.querySelector('.mdw-month.mdw-next');
      next.innerHTML = this.#monthDaysTemplate(dateUtil.addToDateByParts(date, { month: 1 }));

      // this.querySelector('.mdw-years-container').innerHTML = this.#yearTemplate();
    }

    if (updateDaySelection) {
      this.#currentValue = dateUtil.format(date, 'YYYY-MM-DD');
      this.querySelector('.mdw-display-date-text').innerHTML = dateUtil.format(date, 'ddd, MMM DD');
      const selected = this.querySelector('.mdw-day:not(.mdw-not-current-month)[selected]');
      if (selected) selected.removeAttribute('selected');
      const next = this.querySelector(`.mdw-day:not(.mdw-not-current-month)[mdw-date="${this.#currentValue}"]`);
      if (next) next.setAttribute('selected', '');
    }

    this.#drag.emptyIgnoreElements();
    [...this.querySelectorAll('.mdw-control-container')].forEach(e => this.#drag.addIgnoreElement(e));
  }

  #checkMinMax() {
    const previousYearOutOfRange = this.#min && this.#min.getFullYear() >= this.#displayDate.getFullYear();
    const nextYearOutOfRange = this.#max && this.#max.getFullYear() <= this.#displayDate.getFullYear();

    // last day of previous month
    const previousMonthDate = dateUtil.setDateByParts(this.#displayDate, { day: -1 });
    const previousMonthOutOfRange = this.#min && this.#min > previousMonthDate;

    // first day of next month
    const nextMonthDate = dateUtil.setDateByParts(dateUtil.addToDateByParts(this.#displayDate, { month: 1 }), { day: 1 });
    const nextMonthOutOfRange = this.#max && this.#max < nextMonthDate;

    return {
      previousYearOutOfRange,
      nextYearOutOfRange,
      previousMonthOutOfRange,
      nextMonthOutOfRange
    };
  }

  #previousMonthClick() {
    console.log('previousMonthClick')
    this.#changeMonth(-1);
  }

  #nextMonthClick() {
    console.log('nextMonthClick')
    this.#changeMonth(1);
  }

  #dayClick(event) {
    if (!event.target.classList.contains('mdw-day')) return;

    this.#updateDisplayDate(dateUtil.parse(event.target.getAttribute('mdw-date')), false, true);

    const selected = this.querySelector('.mdw-day:not(.mdw-not-current-month)[selected]');
    if (selected) selected.removeAttribute('selected');
    event.target.setAttribute('selected', '');
  }

  async #changeMonth(direction = 1) {
    const active = this.querySelector('.mdw-month.mdw-active');
    const previous = this.querySelector('.mdw-month.mdw-previous');
    const next = this.querySelector('.mdw-month.mdw-next');

    active.classList.remove('mdw-active');
    if (direction === -1) {
      active.classList.add('mdw-animation-active-next');
      previous.classList.add('mdw-animation-previous-active');
      previous.classList.remove('mdw-previous');
    } else {
      active.classList.add('mdw-animation-active-previous');
      next.classList.add('mdw-animation-next-active');
      next.classList.remove('mdw-next');
    }

    const nextDate = dateUtil.addToDateByParts(dateUtil.parse(active.querySelector('[mdw-date]:nth-child(10)').getAttribute('mdw-date')), { month: direction });
    this.#updateDisplayDate(nextDate, false);

    await util.nextAnimationFrameAsync();

    if (direction === -1) {
      active.classList.add('mdw-next');
      previous.classList.add('mdw-active');
      next.classList.add('mdw-previous');
      next.classList.remove('mdw-next');
    } else {
      active.classList.add('mdw-previous');
      next.classList.add('mdw-active');
      previous.classList.add('mdw-next');
      previous.classList.remove('mdw-previous');
    }

    await util.transitionendAsync(active);

    active.classList.remove('mdw-animation-active-next');
    active.classList.remove('mdw-animation-active-previous');
    previous.classList.remove('mdw-animation-previous-active');
    next.classList.remove('mdw-animation-next-active');

    this.#updateDisplayDate(nextDate, true);
  }


  template() {
    const {
      previousYearOutOfRange,
      nextYearOutOfRange,
      previousMonthOutOfRange,
      nextMonthOutOfRange
    } = this.#checkMinMax();

    return /*html*/`
      <div class="mdw-header">
        <div class="mdw-select-date-text">Select date</div>
        <div class="mdw-display-date-container">
          <div class="mdw-display-date-text">${dateUtil.format(this.#displayDate, 'ddd, MMM DD')}</div>
          <mdw-icon id="mdw-edit">edit</mdw-icon>
        </div>
      </div>

      <div class="mdw-divider"></div>

      <div class="mdw-controls-container">
        <div class="mdw-year-drop-down" ${previousYearOutOfRange && nextYearOutOfRange ? 'disabled' : ''}>
          <div class="mdw-year-label">${dateUtil.format(this.#displayDate, 'MMMM YYYY')}</div>
          <mdw-icon>arrow_drop_down</mdw-icon>
        </div>
        <mdw-icon class="mdw-month-previous mdw-bold" ${previousMonthOutOfRange ? 'disabled' : ''}>chevron_left</mdw-icon>
        <mdw-icon class="mdw-month-next mdw-bold" ${nextMonthOutOfRange ? 'disabled' : ''}>chevron_right</mdw-icon>
      </div>

      <div class="mdw-views-container">
        <div class="mdw-months-container">
          <div class="mdw-month mdw-previous">${this.#monthDaysTemplate(dateUtil.addToDateByParts(this.#displayDate, { month: -1 }))}</div>
          <div class="mdw-month mdw-active">${this.#monthDaysTemplate()}</div>
          <div class="mdw-month mdw-next">${this.#monthDaysTemplate(dateUtil.addToDateByParts(this.#displayDate, { month: 1 }))}</div>
        </div>

        <!-- -->
      </div>

      <div class="mdw-actions-container">
        <mdw-button id="mdw-cancel">Cancel</mdw-button>
        <mdw-button id="mdw-ok">Ok</mdw-button>
      </div>
    `;
  }

  #monthDaysTemplate(date = this.#displayDate) {
    const valueFormatted = this.#currentValue;
    const {
      previousMonthOutOfRange,
      nextMonthOutOfRange
    } = this.#checkMinMax();

    return /*html*/`
      <div class="mdw-days-header">
        ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <div class="mdw-days-container">
        ${dateUtil.getMonthDays(date, {
          fillNextMonth: false,
          fillPreviousMonth: false,
          minDate: this.#min,
          maxDate: this.#max
        }).map(week => week.map(({ display, date, currentMonth, interactive, beforeMinDate, afterMaxDate, isToday }) => {
          let classes = 'mdw-day';
          if (beforeMinDate) classes += ' mdw-before-min-date';
          if (afterMaxDate) classes += ' mdw-after-max-date';
          if (interactive) classes += ' mdw-interactive';
          if (beforeMinDate || afterMaxDate) classes += ' mdw-out-of-range';
          if (isToday && display !== '') classes += ' mdw-today';
          if (!currentMonth) classes += ' mdw-not-current-month';
          const formattedDate = dateUtil.format(date, 'YYYY-MM-dd');
          return /* html */`<div class="${classes}" mdw-date="${formattedDate}" ${valueFormatted === formattedDate ? 'selected' : ''}>${display}</div>`;
        }).join('\n')).join('\n')}
      </div>
    `;
  }
});

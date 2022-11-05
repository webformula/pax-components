import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './desktop.css';

// TODO tooltips
// TODO keyboard

customElements.define('mdw-date-picker-desktop', class MDWDatePickerDesktop extends HTMLElementExtended {
  useShadowRoot = false;

  #datePickerComponent;
  #displayDate = '';
  #initialDate = '';
  #min;
  #max;
  #nextMonth_bound = this.#nextMonth.bind(this);
  #previousMonth_bound = this.#previousMonth.bind(this);
  #monthViewClick_bound = this.#monthViewClick.bind(this);
  #monthClick_bound = this.#monthClick.bind(this);
  #nextYear_bound = this.#nextYear.bind(this);
  #previousYear_bound = this.#previousYear.bind(this);
  #yearViewClick_bound = this.#yearViewClick.bind(this);
  #dayClick_bound = this.#dayClick.bind(this);
  #yearClick_bound = this.#yearClick.bind(this);

  #hide_bound = this.#hide.bind(this);
  #clear_bound = this.#clear.bind(this);
  #cancel_bound = this.#cancel.bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#datePickerComponent = document.querySelector(`#${this.getAttribute('mdw-date-picker-id')}`);
    this.#displayDate = this.#datePickerComponent.displayDate;
    this.#initialDate = this.#datePickerComponent.displayDate;
    this.#min = this.#datePickerComponent.min && dateUtil.parse(this.#datePickerComponent.min);
    this.#max = this.#datePickerComponent.max && dateUtil.parse(this.#datePickerComponent.max);
    this.render();
  }

  afterRender() {
    this.querySelector('.mdw-month-next').addEventListener('click', this.#nextMonth_bound);
    this.querySelector('.mdw-month-previous').addEventListener('click', this.#previousMonth_bound);
    this.querySelector('.mdw-month-drop-down').addEventListener('click', this.#monthViewClick_bound);
    this.querySelector('.mdw-months-container').addEventListener('click', this.#monthClick_bound);
    this.querySelector('.mdw-year-next').addEventListener('click', this.#nextYear_bound);
    this.querySelector('.mdw-year-previous').addEventListener('click', this.#previousYear_bound);
    this.querySelector('.mdw-year-drop-down').addEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-month-days-container').addEventListener('click', this.#dayClick_bound);
    // TODO
    this.querySelector('.mdw-years-container').addEventListener('click', this.#yearClick_bound);

    this.querySelector('.mdw-cancel').addEventListener('click', this.#cancel_bound);
    this.querySelector('.mdw-clear').addEventListener('click', this.#clear_bound);
    this.querySelector('.mdw-ok').addEventListener('click', this.#hide_bound);
  }

  disconnectedCallback() {

  }


  setDisplayDate(date) {
    this.#updateDisplayDate(date);
  }

  setMinDate(date) {
    this.#min = date && dateUtil.parse(date);
    this.#updateDisplayDate();
  }

  setMaxDate(date) {
    this.#max = date && dateUtil.parse(date);
    this.#updateDisplayDate();
  }

  #nextMonth() {
    this.#changeMonth(1);
  }

  #previousMonth() {
    this.#changeMonth(-1);
  }

  #nextYear() {
    this.#updateDisplayDate(dateUtil.addToDateByParts(this.#displayDate, { year: 1 }));
  }

  #previousYear() {
    this.#updateDisplayDate(dateUtil.addToDateByParts(this.#displayDate, { year: -1 }));
  }

  #hide() {
    this.#datePickerComponent.hide();
  }

  #cancel() {
    this.#datePickerComponent.setValueDate(this.#initialDate);
    this.#datePickerComponent.hide();
  }

  #clear() {
    this.#updateDisplayDate(dateUtil.today());
    this.#datePickerComponent.setValueDate('');
  }

  #yearViewClick() {
    if (this.classList.contains('mdw-years-view')) {
      this.classList.remove('mdw-years-view');
    } else {
      this.classList.add('mdw-years-view');
      const selectedYear = this.querySelector('.mdw-year-item[selected]');
      if (selectedYear) selectedYear.removeAttribute('selected');

      const currentYear = this.querySelector(`.mdw-year-item[year="${dateUtil.getYear(this.#displayDate)}"]`);
      if (currentYear) {
        currentYear.setAttribute('selected', '');
        currentYear.scrollIntoView({ block: 'center' });
      }
    }
  }

  #monthViewClick() {
    if (this.classList.contains('mdw-months-view')) {
      this.classList.remove('mdw-months-view');
    } else {
      this.classList.add('mdw-months-view');
      const selectedMonth = this.querySelector('.mdw-month-item[selected]');
      if (selectedMonth) selectedMonth.removeAttribute('selected');

      const currentMonth = this.querySelector(`.mdw-month-item[month="${dateUtil.getMonth(this.#displayDate)}"]`);
      if (currentMonth) {
        currentMonth.setAttribute('selected', '');
        currentMonth.scrollIntoView({ block: 'center' });
      }
    }
  }

  #dayClick(event) {
    if (!event.target.classList.contains('mdw-day')) return;

    this.#updateDisplayDate(dateUtil.parse(event.target.getAttribute('mdw-date')), false);
    this.#datePickerComponent.setValueDate(this.#displayDate);

    const selected = this.querySelector('.mdw-day:not(.mdw-not-current-month)[selected]');
    if (selected) selected.removeAttribute('selected');
    event.target.setAttribute('selected', '');

    // fixes clickOutsideToClose bug
    event.stopPropagation();
  }

  #yearClick(event) {
    console.log(event.target);
    if (!event.target.classList.contains('mdw-year-item')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { year: parseInt(event.target.getAttribute('year')) }));

    this.classList.remove('mdw-years-view');

    // fixes clickOutsideToClose bug
    event.stopPropagation();
  }

  #monthClick(event) {
    if (!event.target.classList.contains('mdw-month-item')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { month: parseInt(event.target.getAttribute('month')) }));

    this.classList.remove('mdw-months-view');

    // fixes clickOutsideToClose bug
    event.stopPropagation();
  }

  #updateDisplayDate(date, render = true) {
    this.#displayDate = date;
    this.#datePickerComponent.setDisplayDate(date);

    const parts = dateUtil.getParts(date);
    this.querySelector('.mdw-year-label').innerHTML = parts.year;
    this.querySelector('.mdw-control-container .mdw-month-label').innerHTML = dateUtil.format(date, 'MMMM');

    const selectedYear = this.querySelector('.mdw-year-item[selected]');
    if (selectedYear) selectedYear.removeAttribute('selected');
    const displayYear = this.querySelector(`.mdw-year-item[month="${parts.year}"]`);
    if (displayYear) displayYear.setAttribute('selected', '');

    const selectedMonth = this.querySelector('.mdw-month-item[selected]');
    if (selectedMonth) selectedMonth.removeAttribute('selected');
    const displayMonth = this.querySelector(`.mdw-month-item[month="${parts.year}"]`);
    if (displayMonth) displayMonth.setAttribute('selected', '');

    const {
      previousYearOutOfRange,
      nextYearOutOfRange,
      previousMonthOutOfRange,
      nextMonthOutOfRange
    } = this.#checkMinMax();
    if (previousYearOutOfRange) this.querySelector('.mdw-year-previous').setAttribute('disabled', '');
    else this.querySelector('.mdw-year-previous').removeAttribute('disabled');
    if (nextYearOutOfRange) this.querySelector('.mdw-year-next').setAttribute('disabled', '');
    else this.querySelector('.mdw-year-next').removeAttribute('disabled');
    if (previousYearOutOfRange && nextYearOutOfRange) this.querySelector('.mdw-year-drop-down').setAttribute('disabled', '');
    else this.querySelector('.mdw-year-drop-down').removeAttribute('disabled');
    if (previousMonthOutOfRange) this.querySelector('.mdw-month-previous').setAttribute('disabled', '');
    else this.querySelector('.mdw-month-previous').removeAttribute('disabled');
    if (nextMonthOutOfRange) this.querySelector('.mdw-month-next').setAttribute('disabled', '');
    else this.querySelector('.mdw-month-next').removeAttribute('disabled');
    if (previousMonthOutOfRange && nextMonthOutOfRange) this.querySelector('.mdw-month-drop-down').setAttribute('disabled', '');
    else this.querySelector('.mdw-month-drop-down').removeAttribute('disabled');

    if (render) {
      this.querySelector('.mdw-days-container.mdw-active').innerHTML = this.#monthDaysTemplate();
      this.querySelector('.mdw-years-container').innerHTML = this.#yearTemplate();
      this.querySelector('.mdw-months-container').innerHTML = this.#monthsTemplate();
    }
  }

  async #changeMonth(direction = 1) {
    const active = this.querySelector('.mdw-days-container.mdw-active');
    const alt = this.querySelector('.mdw-days-container:not(.mdw-active)');
    const nextDate = dateUtil.addToDateByParts(dateUtil.parse(active.querySelector('[mdw-date]:nth-child(10)').getAttribute('mdw-date')), { month: direction });
    alt.innerHTML = this.#monthDaysTemplate(nextDate);

    this.#updateDisplayDate(nextDate);

    if (direction === 1) {
      alt.classList.add('mdw-animation-start-next-to-active');
    } else {
      alt.classList.add('mdw-animation-start-previous-to-active');
    }

    await util.nextAnimationFrameAsync();

    if (direction === 1) {
      active.classList.add('mdw-animation-start-next-from-active');
      alt.classList.add('mdw-animation-next-to-active');
    } else {
      active.classList.add('mdw-animation-start-previous-from-active');
      alt.classList.add('mdw-animation-previous-to-active');
    }
    active.classList.remove('active');
    alt.classList.add('active');

    await util.transitionendAsync(active);
    active.classList.remove('mdw-animation-start-next-from-active');
    alt.classList.remove('mdw-animation-next-to-active');
    active.classList.remove('mdw-animation-start-previous-from-active');
    alt.classList.remove('mdw-animation-previous-to-active');
    alt.classList.remove('mdw-animation-start-next-to-active');
    alt.classList.remove('mdw-animation-start-previous-to-active');
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


  template() {
    const {
      previousYearOutOfRange,
      nextYearOutOfRange,
      previousMonthOutOfRange,
      nextMonthOutOfRange
    } = this.#checkMinMax();


    return /*html*/`
      <div class="mdw-control-container">
        <mdw-icon class="mdw-month-previous" ${previousMonthOutOfRange ? 'disabled' : ''}>chevron_left</mdw-icon>
        <div class="mdw-month-drop-down" ${previousMonthOutOfRange && nextMonthOutOfRange ? 'disabled' : ''}>
          <div class="mdw-month-label">${dateUtil.format(this.#displayDate, 'MMMM')}</div>
          <mdw-icon>arrow_drop_down</mdw-icon>
        </div>
        <mdw-icon class="mdw-month-next" ${nextMonthOutOfRange ? 'disabled' : ''}>chevron_right</mdw-icon>
        <mdw-icon class="mdw-year-previous" ${previousYearOutOfRange ? 'disabled' : ''}>chevron_left</mdw-icon>
        <div class="mdw-year-drop-down" ${previousYearOutOfRange && nextYearOutOfRange ? 'disabled' : ''}>
          <div class="mdw-year-label">${dateUtil.getYear(this.#displayDate)}</div>
          <mdw-icon>arrow_drop_down</mdw-icon>
        </div>
        <mdw-icon class="mdw-year-next" ${nextYearOutOfRange ? 'disabled' : ''}>chevron_right</mdw-icon>
      </div>

      <div class="mdw-month-days-container">
        <div class="mdw-days-header">
          ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
        </div>

        <div class="mdw-days-container mdw-active">${this.#monthDaysTemplate()}</div>
        <div class="mdw-days-container">${this.#monthDaysTemplate()}</div>
      </div>

      <div class="mdw-months-container">${this.#monthsTemplate()}</div>
      <div class="mdw-years-container">${this.#yearTemplate()}</div>

      <div class="mdw-actions">
        <mdw-button class="mdw-clear">Clear</mdw-button>
        <mdw-button class="mdw-cancel">Cancel</mdw-button>
        <mdw-button class="mdw-ok">OK</mdw-button>
      </div>
    `;
  }

  #monthDaysTemplate(date = this.#displayDate) {
    const valueFormatted = this.#datePickerComponent.value;
    return dateUtil.getMonthDays(date, {
      fillPreviousMonth: true,
      fillNextMonth: true,
      minDate: this.#min,
      maxDate: this.#max
    }).map(week => week.map(({ display, date, currentMonth, interactive, beforeMinDate, afterMaxDate, isToday }) => {
      let classes = 'mdw-day';
      // let { year, month, day } = dateUtil.getParts(date);
      if (beforeMinDate) classes += ' mdw-before-min-date';
      if (afterMaxDate) classes += ' mdw-after-max-date';
      if (interactive) classes += ' mdw-interactive';
      if (beforeMinDate || afterMaxDate) classes += ' mdw-out-of-range';
      if (isToday && display !== '') classes += ' mdw-today';
      if (!currentMonth) classes += ' mdw-not-current-month';
      const formattedDate = dateUtil.format(date, 'YYYY-MM-dd');
      return /* html */`<div class="${classes}" mdw-date="${formattedDate}" ${valueFormatted === formattedDate ? 'selected' : ''}>${display}</div>`;
    }).join('\n')).join('\n');
  }

  #yearTemplate() {
    return dateUtil.defaultYearRange().map(year => {
      const isPreviousMinYear = this.#min && this.#min.getFullYear() > year;
      const isNextMaxYear = this.#max && this.#max.getFullYear() < year;
      const outOfRange = isPreviousMinYear || isNextMaxYear;
      return /*html*/`
        <div class="mdw-year-item" ${outOfRange ? 'disabled' : ''} year="${year}">
          <mdw-icon>check</mdw-icon>
          ${year}
        </div>
      `;
    }).join('\n');
  }

  #monthsTemplate() {
    const monthNames = dateUtil.getMonthNames();
    return monthNames.map((name, i) => {
      const isPreviousMinMonth = this.#min && this.#min.getMonth() > i;
      const isNextMaxMonth = this.#max && this.#max.getMonth() < i;
      const outOfRange = isPreviousMinMonth || isNextMaxMonth;
      return /*html*/`
        <div class="mdw-month-item" ${outOfRange ? 'disabled' : ''} month="${i + 1}">
          <mdw-icon>check</mdw-icon>
          ${name}
        </div>
      `;
    }).join('\n');
  }
});

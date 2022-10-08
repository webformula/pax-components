import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './desktop.css';

// TODO min max
// TODO tooltips

customElements.define('mdw-date-picker-desktop', class MDWDatePickerDesktop extends HTMLElementExtended {
  useShadowRoot = false;

  #datePickerComponent;
  #displayDate = '';
  #nextMonth_bound = this.#nextMonth.bind(this);
  #previousMonth_bound = this.#previousMonth.bind(this);
  #yearViewClick_bound = this.#yearViewClick.bind(this);
  #dayClick_bound = this.#dayClick.bind(this);
  #yearClick_bound = this.#yearClick.bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#datePickerComponent = document.querySelector(`#${this.getAttribute('mdw-date-picker-id')}`);
    this.#displayDate = this.#datePickerComponent.displayDate;
    this.render();
  }

  disconnectedCallback() {
    this.querySelector('#mdw-next-month-arrow').removeEventListener('click', this.#nextMonth_bound);
    this.querySelector('#mdw-previous-month-arrow').removeEventListener('click', this.#previousMonth_bound);
    this.querySelector('.mdw-year-label').removeEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-month-label').removeEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-months-container').removeEventListener('click', this.#dayClick_bound);
    this.querySelector('.mdw-years-container').removeEventListener('click', this.#yearClick_bound);
  }

  afterRender() {
    this.querySelector('#mdw-next-month-arrow').addEventListener('click', this.#nextMonth_bound);
    this.querySelector('#mdw-previous-month-arrow').addEventListener('click', this.#previousMonth_bound);
    this.querySelector('.mdw-year-label').addEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-month-label').addEventListener('click', this.#yearViewClick_bound);
    this.querySelector('.mdw-months-container').addEventListener('click', this.#dayClick_bound);
    this.querySelector('.mdw-years-container').addEventListener('click', this.#yearClick_bound);
  }

  setDisplayDate(date) {
    this.#updateDisplayDate(date, true, true);
  }

  #nextMonth() {
    this.#changeMonth(1);
  }

  #previousMonth() {
    this.#changeMonth(-1);
  }

  #yearViewClick() {
    if (this.classList.contains('mdw-year-view')) {
      this.classList.remove('mdw-year-view');
    } else {
      this.classList.add('mdw-year-view');
      const selectedYear = this.querySelector('.mdw-year[selected]');
      if (selectedYear) selectedYear.removeAttribute('selected');

      const currentYear = this.querySelector(`.mdw-year[mdw-year="${dateUtil.getYear(this.#displayDate)}"]`);
      if (currentYear) {
        currentYear.setAttribute('selected', '');
        currentYear.scrollIntoView({ block: 'center' });
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

    this.#datePickerComponent.hide();

    // fixes clickOutsideToClose bug
    event.stopPropagation();
  }

  #yearClick(event) {
    if (!event.target.classList.contains('mdw-year')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { year: parseInt(event.target.getAttribute('mdw-year')) }));

    this.classList.remove('mdw-year-view');
  }

  #updateDisplayDate(date, render = true) {
    this.#displayDate = date;
    this.#datePickerComponent.setDisplayDate(date);

    const parts = dateUtil.getParts(date);
    this.querySelector('.mdw-year-label').innerHTML = parts.year;
    this.querySelector('.mdw-control-container .mdw-month-label').innerHTML = dateUtil.format(date, 'MMMM');

    const selectedYear = this.querySelector('.mdw-year[selected]');
    if (selectedYear) selectedYear.removeAttribute('selected');
    const displayYear = this.querySelector(`.mdw-year[year="${parts.year}"]`);
    if (displayYear) displayYear.setAttribute('selected', '');

    if (render) this.querySelector('.mdw-days-container.mdw-active').innerHTML = this.#monthDaysTemplate();
  }

  async #changeMonth(direction = 1) {
    const active = this.querySelector('.mdw-days-container.mdw-active');
    const alt = this.querySelector('.mdw-days-container:not(.mdw-active)');
    const nextDate = dateUtil.addToDateByParts(dateUtil.parse(active.querySelector('[mdw-date]:nth-child(10)').getAttribute('mdw-date')), { month: direction });
    alt.innerHTML = this.#monthDaysTemplate(nextDate);

    this.#updateDisplayDate(nextDate);

    // this.querySelector('.mdw-control-container .mdw-month-label').innerHTML = dateUtil.format(nextDate, 'MMMM');
    // this.querySelector('.mdw-control-container .mdw-year-label').innerHTML = dateUtil.getYear(nextDate);

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


  template() {
    return /* html */`
      <div class="mdw-control-container">
        <div class="mdw-month-label">${dateUtil.format(this.#displayDate, 'MMMM')}</div>
        <div class="mdw-year-label">
          ${dateUtil.getYear(this.#displayDate)}
          <div class="mdw-arrow"></div>
        </div>
        <mdw-icon id="mdw-previous-month-arrow" class="mdw-bold">keyboard_arrow_left</mdw-icon>
        <mdw-icon id="mdw-next-month-arrow" class="mdw-bold">keyboard_arrow_right</mdw-icon>
      </div>

      <div class="mdw-months-container">
        <div class="mdw-days-header">
          ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
        </div>
        <div class="mdw-days-container mdw-active">${this.#monthDaysTemplate()}</div>
        <div class="mdw-days-container">${this.#monthDaysTemplate()}</div>
      </div>

      <div class="mdw-years-container">
        ${dateUtil.defaultYearRange().map(year => `<div class="mdw-year" mdw-year="${year}">${year}</div>`).join('\n') }
      </div>
    `;
  }


  #monthDaysTemplate(date = this.#displayDate) {
    const valueFormatted = this.#datePickerComponent.value;
    return dateUtil.getMonthDays(date, {
      fillNextMonth: true
      // minDate: MDWDateUtil.parse(this.minDate),
      // maxDate: MDWDateUtil.parse(this.maxDate)
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
});

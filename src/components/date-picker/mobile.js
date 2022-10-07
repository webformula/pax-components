import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './mobile.css';

// TODO tooltips

customElements.define('mdw-date-picker-mobile', class MDWDatePickerMobile extends HTMLElementExtended {
  useShadowRoot = false;

  #datePickerComponent;
  #displayDate = '';
  #monthClickHandler_bound = this.#monthClickHandler.bind(this);
  #yearClickHandler_bound = this.#yearClickHandler.bind(this);
  #okHandler_bound = this.#okHandler.bind(this);
  #cancelHandler_bound = this.#cancelHandler.bind(this);
  #yearScrollHandler_bound = util.rafThrottle(this.#yearScrollHandler).bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#datePickerComponent = document.querySelector(`#${this.getAttribute('mdw-date-picker-id')}`);
    this.#displayDate = this.#datePickerComponent.displayDate;
    this.render();
  }

  disconnectedCallback() {
    this.beforeRender();
  }

  afterRender() {
    this.querySelector('.mdw-months-container').addEventListener('click', this.#monthClickHandler_bound);
    this.querySelector('.mdw-years-container').addEventListener('click', this.#yearClickHandler_bound);
    this.querySelector('#mdw-ok').addEventListener('click', this.#okHandler_bound);
    this.querySelector('#mdw-cancel').addEventListener('click', this.#cancelHandler_bound);
  }

  beforeRender() {
    if (!this.rendered) return;
    this.querySelector('.mdw-months-container').removeEventListener('click', this.#monthClickHandler_bound);
    this.querySelector('.mdw-years-container').removeEventListener('click', this.#yearClickHandler_bound);
    this.querySelector('#mdw-ok').removeEventListener('click', this.#okHandler_bound);
    this.querySelector('#mdw-cancel').removeEventListener('click', this.#cancelHandler_bound);
  }


  #okHandler() {
    this.#datePickerComponent.setValueDate(this.#displayDate);
    this.#datePickerComponent.setDisplayDate(this.#displayDate);
    this.#datePickerComponent.hide();
  }

  #cancelHandler() {
    this.#datePickerComponent.hide();
  }

  #monthClickHandler(event) {
    if (event.target.classList.contains('mdw-next-month-arrow')) this.#changeMonth(1);
    if (event.target.classList.contains('mdw-previous-month-arrow')) this.#changeMonth(-1);
    if (event.target.classList.contains('mdw-day')) this.#dayClickHandler(event);
    if (this.querySelector('.mdw-month.mdw-active .mdw-control-container').contains(event.target)) this.#yearView();  }

  #dayClickHandler(event) {
    this.#updateDisplayDate(dateUtil.parse(event.target.getAttribute('mdw-date')), false);

    const selected = this.querySelector('.mdw-day:not(.mdw-not-current-month)[selected]');
    if (selected) selected.removeAttribute('selected');
    event.target.setAttribute('selected', '');
  }

  #yearView() {
    if (this.classList.contains('mdw-year-view')) {
      this.classList.remove('mdw-year-view');
      this.querySelector('.mdw-years-container').removeEventListener('scroll', this.#yearScrollHandler_bound);
      this.classList.remove('mdw-scrolled');
      this.classList.remove('mdw-scrolled-fully');
    } else {
      this.classList.add('mdw-year-view');
      const selectedYear = this.querySelector('.mdw-year[selected]');
      if (selectedYear) selectedYear.removeAttribute('selected');

      const currentYear = this.querySelector(`.mdw-year[mdw-year="${dateUtil.getYear(this.#displayDate)}"]`);
      if (currentYear) {
        currentYear.setAttribute('selected', '');
        currentYear.scrollIntoView({ block: 'center' });
      }
      this.querySelector('.mdw-years-container').addEventListener('scroll', this.#yearScrollHandler_bound);
    }
  }

  #yearClickHandler(event) {
    if (!event.target.classList.contains('mdw-year')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { year: parseInt(event.target.getAttribute('mdw-year')) }));

    this.classList.remove('mdw-year-view');
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

    this.#updateDisplayDate(nextDate);
  }

  #updateDisplayDate(date, render = true) {
    this.#displayDate = date;
    this.#datePickerComponent.setDisplayDate(date);

    this.querySelector('.mdw-display-date-text').innerHTML = dateUtil.format(date, 'ddd, MMM DD');


    if (!render) return;

    const active = this.querySelector('.mdw-month.mdw-active');
    active.innerHTML = this.#monthDaysTemplate();
    const previous = this.querySelector('.mdw-month.mdw-previous');
    previous.innerHTML = this.#monthDaysTemplate(dateUtil.addToDateByParts(date, { month: -1 }));
    const next = this.querySelector('.mdw-month.mdw-next');
    next.innerHTML = this.#monthDaysTemplate(dateUtil.addToDateByParts(date, { month: 1 }));

    const parts = dateUtil.getParts(date);
    const selectedYear = this.querySelector('.mdw-year[selected]');
    if (selectedYear) selectedYear.removeAttribute('selected');
    const displayYear = this.querySelector(`.mdw-year[year="${parts.year}"]`);
    if (displayYear) displayYear.setAttribute('selected', '');
  }

  #yearScrollHandler(event) {
    this.classList.toggle('mdw-scrolled', event.target.scrollTop > 0);
    this.classList.toggle('mdw-scrolled-fully', event.target.scrollHeight - event.target.offsetHeight === event.target.scrollTop);
  }

  template() {
    return /* html */`
      <div class="mdw-header">
        <div class="mdw-select-date-text">Select date</div>
        <div class="mdw-display-date-container">
          <div class="mdw-display-date-text">${dateUtil.format(this.#displayDate, 'ddd, MMM DD')}</div>
          <mdw-icon>edit</mdw-icon>
        </div>
      </div>

      <div class="mdw-views-container">
        <div class="mdw-months-container">
          <div class="mdw-month mdw-previous">${this.#monthDaysTemplate(dateUtil.addToDateByParts(this.#displayDate, { month: -1 }))}</div>
          <div class="mdw-month mdw-active">${this.#monthDaysTemplate()}</div>
          <div class="mdw-month mdw-next">${this.#monthDaysTemplate(dateUtil.addToDateByParts(this.#displayDate, { month: 1 }))}</div>
        </div>

        <div class="mdw-years-container">
          ${dateUtil.defaultYearRange().map(year => `<div class="mdw-year" mdw-year="${year}">${year}</div>`).join('\n') }
        </div>
      </div>

      <div class="mdw-actions-container">
        <mdw-button id="mdw-cancel">Cancel</mdw-button>
        <mdw-button id="mdw-ok">Ok</mdw-button>
      </div>
    `;
  }

  // <div class="mdw-control-container">
  //       <div class="mdw-month-label">${dateUtil.format(this.#displayDate, 'MMMM')}</div>
  //       <div class="mdw-year-label">
  //         ${dateUtil.getYear(this.#displayDate)}
  //         <div class="mdw-arrow"></div>
  //       </div>
  //       <mdw-icon id="mdw-previous-month-arrow" class="mdw-bold">keyboard_arrow_left</mdw-icon>
  //       <mdw-icon id="mdw-next-month-arrow" class="mdw-bold">keyboard_arrow_right</mdw-icon>
  //     </div>

  //     <div class="mdw-months-container">
  //       <div class="mdw-days-header">
  //         ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
  //       </div>
  //       <div class="mdw-days-container mdw-active">${this.#monthDaysTemplate()}</div>
  //       <div class="mdw-days-container">${this.#monthDaysTemplate()}</div>
  //     </div>

  //     <div class="mdw-years-container">
  //       ${dateUtil.defaultYearRange().map(year => `<div class="mdw-year" mdw-year="${year}">${year}</div>`).join('\n')}
  //     </div>


  #monthDaysTemplate(date = this.#displayDate) {
    const valueFormatted = this.#datePickerComponent.value;
    return `
      <div class="mdw-control-container">
        <div class="mdw-month-label">${dateUtil.format(date, 'MMMM')}</div>
        <div class="mdw-year-label">
          ${dateUtil.getYear(date)}
          <div class="mdw-arrow"></div>
        </div>
        <mdw-icon class="mdw-previous-month-arrow mdw-bold">keyboard_arrow_left</mdw-icon>
        <mdw-icon class="mdw-next-month-arrow mdw-bold">keyboard_arrow_right</mdw-icon>
      </div>

      <div class="mdw-days-header">
        ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <div class="mdw-days-container">
        ${dateUtil.getMonthDays(date, {
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
        }).join('\n')).join('\n')}
      </div>
    `;
  }
});

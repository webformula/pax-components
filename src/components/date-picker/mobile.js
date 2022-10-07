import HTMLElementExtended from '../HTMLElementExtended.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import Drag from '../../core/drag.js';
import './mobile.css';

// TODO tooltips

customElements.define('mdw-date-picker-mobile', class MDWDatePickerMobile extends HTMLElementExtended {
  useShadowRoot = false;

  #drag = new Drag();
  #datePickerComponent;
  #displayDate = '';
  #monthClickHandler_bound = this.#monthClickHandler.bind(this);
  #yearClickHandler_bound = this.#yearClickHandler.bind(this);
  #okHandler_bound = this.#okHandler.bind(this);
  #cancelHandler_bound = this.#cancelHandler.bind(this);
  #yearScrollHandler_bound = util.rafThrottle(this.#yearScrollHandler).bind(this);
  #onDrag_bound = this.#onDrag.bind(this);
  #onDragEnd_bound = this.#onDragEnd.bind(this);
  #inputView_bound = this.#inputView.bind(this);
  #onInput_bound = util.debounce(this.#onInput, 100).bind(this);


  constructor() {
    super();
  }

  connectedCallback() {
    this.#datePickerComponent = document.querySelector(`#${this.getAttribute('mdw-date-picker-id')}`);
    this.#displayDate = this.#datePickerComponent.displayDate;
    this.render();
  }

  disconnectedCallback() {
    this.querySelector('.mdw-months-container').removeEventListener('click', this.#monthClickHandler_bound);
    this.querySelector('.mdw-years-container').removeEventListener('click', this.#yearClickHandler_bound);
    this.querySelector('#mdw-ok').removeEventListener('click', this.#okHandler_bound);
    this.querySelector('#mdw-cancel').removeEventListener('click', this.#cancelHandler_bound);
    this.querySelector('#mdw-edit').removeEventListener('click', this.#inputView_bound);

    this.#drag.destroy();
    this.#drag = undefined;
  }

  afterRender() {
    this.#drag.element = this.querySelector('.mdw-months-container');
    this.#drag.onDrag(this.#onDrag_bound);
    this.#drag.onEnd(this.#onDragEnd_bound);
    [...this.querySelectorAll('.mdw-control-container')].forEach(e => this.#drag.addIgnoreElement(e));
    this.#drag.enable();

    this.querySelector('.mdw-months-container').addEventListener('click', this.#monthClickHandler_bound);
    this.querySelector('.mdw-years-container').addEventListener('click', this.#yearClickHandler_bound);
    this.querySelector('#mdw-ok').addEventListener('click', this.#okHandler_bound);
    this.querySelector('#mdw-cancel').addEventListener('click', this.#cancelHandler_bound);
    this.querySelector('#mdw-edit').addEventListener('click', this.#inputView_bound);
  }

  setDisplayDate(date) {
    this.#updateDisplayDate(date, true, true);
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
    else if (event.target.classList.contains('mdw-previous-month-arrow')) this.#changeMonth(-1);
    else if (event.target.classList.contains('mdw-day')) this.#dayClickHandler(event);
    else if (event.target.classList.contains('mdw-month-label')) this.#yearView();
    else if (event.target.classList.contains('mdw-year-label')) this.#yearView();
  }

  #dayClickHandler(event) {
    this.#updateDisplayDate(dateUtil.parse(event.target.getAttribute('mdw-date')), false);

    const selected = this.querySelector('.mdw-day:not(.mdw-not-current-month)[selected]');
    if (selected) selected.removeAttribute('selected');
    event.target.setAttribute('selected', '');
  }

  #yearClickHandler(event) {
    if (!event.target.classList.contains('mdw-year')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { year: parseInt(event.target.getAttribute('mdw-year')) }));

    this.classList.remove('mdw-year-view');
  }

  #yearView() {
    if (this.classList.contains('mdw-year-view')) {
      this.classList.remove('mdw-year-view');
      this.querySelector('.mdw-years-container').removeEventListener('scroll', this.#yearScrollHandler_bound);
      this.classList.remove('mdw-scrolled');
      this.classList.remove('mdw-scrolled-fully');
      this.#drag.enable();
    } else {
      this.#drag.disable();
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

  #inputView() {
    if (this.classList.contains('mdw-input-view')) {
      this.querySelector('input').removeEventListener('input', this.#onInput_bound);
      this.classList.remove('mdw-input-view');
      this.#drag.enable();
    } else {
      this.#drag.disable();
      this.classList.add('mdw-input-view');
      this.classList.remove('mdw-years-view');
      this.querySelector('input').addEventListener('click', e => e.preventDefault());
      this.querySelector('input').value = dateUtil.format(this.#displayDate, 'YYYY-MM-DD');
      this.querySelector('input').addEventListener('input', this.#onInput_bound);
      this.querySelector('.mdw-years-container').removeEventListener('scroll', this.#yearScrollHandler_bound);
      this.classList.remove('mdw-scrolled');
      this.classList.remove('mdw-scrolled-fully');
    }
  }

  #onInput(event) {
    this.#updateDisplayDate(dateUtil.parse(event.target.value), true, true);
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

  #updateDisplayDate(date, render = true, updateDaySelection = false) {
    this.#displayDate = date;
    this.#datePickerComponent.setDisplayDate(date);

    this.querySelector('.mdw-display-date-text').innerHTML = dateUtil.format(date, 'ddd, MMM DD');
    const parts = dateUtil.getParts(date);
    const selectedYear = this.querySelector('.mdw-year[selected]');
    if (selectedYear) selectedYear.removeAttribute('selected');
    const displayYear = this.querySelector(`.mdw-year[year="${parts.year}"]`);
    if (displayYear) displayYear.setAttribute('selected', '');

    if (render) {
      const active = this.querySelector('.mdw-month.mdw-active');
      active.innerHTML = this.#monthDaysTemplate();
      const previous = this.querySelector('.mdw-month.mdw-previous');
      previous.innerHTML = this.#monthDaysTemplate(dateUtil.addToDateByParts(date, { month: -1 }));
      const next = this.querySelector('.mdw-month.mdw-next');
      next.innerHTML = this.#monthDaysTemplate(dateUtil.addToDateByParts(date, { month: 1 }));
    }

    if (updateDaySelection) {
      const selected = this.querySelector('.mdw-day:not(.mdw-not-current-month)[selected]');
      if (selected) selected.removeAttribute('selected');
      const next = this.querySelector(`.mdw-day:not(.mdw-not-current-month)[mdw-date="${dateUtil.format(date, 'YYYY-MM-DD')}"]`);
      if (next) next.setAttribute('selected', '');
    }

    this.#drag.emptyIgnoreElements();
    [...this.querySelectorAll('.mdw-control-container')].forEach(e => this.#drag.addIgnoreElement(e));
  }

  #yearScrollHandler(event) {
    this.classList.toggle('mdw-scrolled', event.target.scrollTop > 0);
    this.classList.toggle('mdw-scrolled-fully', event.target.scrollHeight - event.target.offsetHeight === event.target.scrollTop);
  }

  #onDrag({ distance }) {
    this.querySelector('.mdw-months-container').style.transform = `translateX(${distance.x}px)`;
  }

  async #onDragEnd({ distance }) {
    const container = this.querySelector('.mdw-months-container');
    const active = this.querySelector('.mdw-month.mdw-active');
    const halfway = active.offsetWidth / 2;

    container.style.transition = 'transform 120ms';
    if (distance.x >= halfway) {
      container.style.transform = 'translateX(100%)';
    } else if (distance.x <= -halfway) {
      container.style.transform = 'translateX(-100%)';
    } else {
      container.style.transform = 'translateX(0)';
    }

    await util.transitionendAsync(container);

    container.style.transition = '';
    container.style.transform = '';
    if (distance.x >= halfway) {
      this.#updateDisplayDate(dateUtil.addToDateByParts(this.#displayDate, { month: -1 }));
    } else if (distance.x <= -halfway) {
      this.#updateDisplayDate(dateUtil.addToDateByParts(this.#displayDate, { month: 1 }));
    }
  }


  template() {
    return /* html */`
      <div class="mdw-header">
        <div class="mdw-select-date-text">Select date</div>
        <div class="mdw-display-date-container">
          <div class="mdw-display-date-text">${dateUtil.format(this.#displayDate, 'ddd, MMM DD')}</div>
          <mdw-icon id="mdw-edit">edit</mdw-icon>
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

        <div class="mdw-input-container">
          <mdw-text-field>
            <input type="date">
            <label>Enter date</label>
          </mdw-text-field>
        </div>
      </div>

      <div class="mdw-actions-container">
        <mdw-button id="mdw-cancel">Cancel</mdw-button>
        <mdw-button id="mdw-ok">Ok</mdw-button>
      </div>
    `;
  }


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

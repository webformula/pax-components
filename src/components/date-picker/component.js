import HTMLElementExtended from '../HTMLElementExtended.js';
import Panel from '../../core/panel.js';
import dateUtil from '../../core/date.js';
import util from '../../core/util.js';
import './component.css';

customElements.define('mdw-date-picker', class MDWButton extends HTMLElementExtended {
  useShadowRoot = false;

  #value = '';
  #displayDate = '';
  #panel;
  #control;
  #isTextField = false;
  #onControlFocus_bound = this.#onControlFocus.bind(this);
  #onPanelRender_bound = this.#onPanelRender.bind(this);
  #onPanelHide_bound = this.#onPanelHide.bind(this);
  #nextMonth_bound = this.#nextMonth.bind(this);
  #previousMonth_bound = this.#previousMonth.bind(this);
  #yearViewClick_bound = this.#yearViewClick.bind(this);
  #dayClick_bound = this.#dayClick.bind(this);
  #yearClick_bound = this.#yearClick.bind(this);


  constructor() {
    super();

    this.#control = this.parentNode;
    if (this.#control.nodeName === 'MDW-TEXT-FIELD') {
      this.#isTextField = true;
      this.#control.classList.add('mdw-has-date-picker');
    }

    if (this.#isTextField) this.value = this.#control.querySelector('input').value;
    else if (his.hasAttribute('value')) this.value = this.getAttribute('value');

    this.#displayDate = dateUtil.parse(this.value ? this.value : dateUtil.today());

    this.#preparePanel();
  }

  get value() {
    return this.#value;
  }
  set value(value) {
    // TODO parse verify
    this.#value = value && dateUtil.parse(value);
  }

  connectedCallback() {
    if (this.#isTextField) {
      this.#control.querySelector('input').addEventListener('focus', this.#onControlFocus_bound);
    } else {
      this.#control.addEventListener('focus', this.#onControlFocus_bound);
    }
  }

  disconnectedCallback() {
    if (this.#isTextField) {
      this.#control.querySelector('input').removeEventListener('focus', this.#onControlFocus_bound);
    } else {
      this.#control.removeEventListener('focus', this.#onControlFocus_bound);
    }
  }

  #onPanelRender() {
    this.#panel.element.querySelector('#mdw-next-month-arrow').addEventListener('click', this.#nextMonth_bound);
    this.#panel.element.querySelector('#mdw-previous-month-arrow').addEventListener('click', this.#previousMonth_bound);
    this.#panel.element.querySelector('.mdw-year-label').addEventListener('click', this.#yearViewClick_bound);
    this.#panel.element.querySelector('.mdw-months-container').addEventListener('click', this.#dayClick_bound);
    this.#panel.element.querySelector('.mdw-years-container').addEventListener('click', this.#yearClick_bound);
  }

  #onPanelHide() {
    this.#panel.element.querySelector('#mdw-next-month-arrow').removeEventListener('click', this.#nextMonth_bound);
    this.#panel.element.querySelector('#mdw-previous-month-arrow').removeEventListener('click', this.#previousMonth_bound);
    this.#panel.element.querySelector('.mdw-year-label').removeEventListener('click', this.#yearViewClick_bound);
    this.#panel.element.querySelector('.mdw-months-container').removeEventListener('click', this.#dayClick_bound);
    this.#panel.element.querySelector('.mdw-years-container').removeEventListener('click', this.#yearClick_bound);
  }

  #onControlFocus() {
    this.#panel.template = this.template();
    this.#panel.show();
  }

  #nextMonth() {
    this.#changeMonth(1);
  }

  #previousMonth() {
    this.#changeMonth(-1);
  }

  #yearViewClick() {
    if (this.#panel.element.classList.contains('mdw-year-view')) {
      this.#panel.element.classList.remove('mdw-year-view');
    } else {
      this.#panel.element.classList.add('mdw-year-view');
      const selectedYear = this.#panel.element.querySelector('.mdw-year[selected]');
      if (selectedYear) selectedYear.removeAttribute('selected');

      const currentYear = this.#panel.element.querySelector(`.mdw-year[mdw-year="${dateUtil.getYear(this.#displayDate)}"]`);
      if (currentYear) {
        currentYear.setAttribute('selected', '');
        currentYear.scrollIntoView({ block: 'center' });
      }
    }
  }

  #dayClick(event) {
    if (!event.target.classList.contains('mdw-month-day')) return;

    this.#updateDisplayDate(dateUtil.parse(event.target.getAttribute('mdw-date')));
    this.#value = this.#displayDate;

    const selected = this.#panel.element.querySelector('.mdw-month-day[selected]');
    if (selected) selected.removeAttribute('selected');
    event.target.setAttribute('selected', '');

    if (this.#isTextField) this.#control.querySelector('input').value = event.target.getAttribute('mdw-date');

    this.#panel.hide();
  }

  #yearClick(event) {
    if (!event.target.classList.contains('mdw-year')) return;

    this.#updateDisplayDate(dateUtil.setDateByParts(this.#displayDate, { year: parseInt(event.target.getAttribute('mdw-year')) }));

    this.#panel.element.classList.remove('mdw-year-view');
  }

  #updateDisplayDate(date) {
    this.#displayDate = date;
    if (!this.#panel.showing) return;

    const parts = dateUtil.getParts(date);
    this.#panel.element.querySelector('.mdw-year-label').innerHTML = parts.year;
    this.#panel.element.querySelector('.mdw-control-container .mdw-month-label').innerHTML = dateUtil.format(date, 'MMMM');

    const selectedYear = this.#panel.element.querySelector('.mdw-year[selected]');
    if (selectedYear) selectedYear.removeAttribute('selected');
    const displayYear = this.#panel.element.querySelector(`.mdw-year[mdw-year="${parts.year}"]`);
    if (displayYear) displayYear.setAttribute('selected', '');
    
    this.#panel.element.querySelector('.mdw-month-days-container.mdw-active').innerHTML = this.#monthDaysTemplate();
  }

  async #changeMonth(direction = 1) {
    const active = this.#panel.element.querySelector('.mdw-month-days-container.mdw-active');
    const alt = this.#panel.element.querySelector('.mdw-month-days-container:not(.mdw-active)');
    const nextDate = dateUtil.addToDateByParts(dateUtil.parse(active.querySelector('[mdw-date]:nth-child(10)').getAttribute('mdw-date')), { month: direction });
    alt.innerHTML = this.#monthDaysTemplate(nextDate);
    
    this.#updateDisplayDate(nextDate);

    // this.#panel.element.querySelector('.mdw-control-container .mdw-month-label').innerHTML = dateUtil.format(nextDate, 'MMMM');
    // this.#panel.element.querySelector('.mdw-control-container .mdw-year-label').innerHTML = dateUtil.getYear(nextDate);

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
    active.classList.remove('mdw-active');
    alt.classList.add('mdw-active');

    await util.transitionendAsync(active);
    active.classList.remove('mdw-animation-start-next-from-active');
    alt.classList.remove('mdw-animation-next-to-active');
    active.classList.remove('mdw-animation-start-previous-from-active');
    alt.classList.remove('mdw-animation-previous-to-active');
    alt.classList.remove('mdw-animation-start-next-to-active');
    alt.classList.remove('mdw-animation-start-previous-to-active');
  }

  #preparePanel() {
    this.#panel = new Panel();
    this.#panel.classes = 'mdw-date-picker-panel';
    this.#panel.template = this.template();
    this.#panel.backdrop = false;
    this.#panel.clickOutsideToClose = true;
    this.#panel.addIgnoreElement(this.#control);
    this.#panel.targetElement = this.#control;
    this.#panel.onRender = this.#onPanelRender_bound;
    this.#panel.onHide = this.#onPanelHide_bound;
  }

  template() {
    return /* html */`
      <div class="mdw-control-container">
        <div class="mdw-month-label">${dateUtil.format(this.#displayDate, 'MMMM')}</div>
        <div class="mdw-year-label">${dateUtil.getYear(this.#displayDate)}</div>
        <mdw-icon id="mdw-previous-month-arrow" class="mdw-bold">keyboard_arrow_left</mdw-icon>
        <mdw-icon id="mdw-next-month-arrow" class="mdw-bold">keyboard_arrow_right</mdw-icon>
      </div>

      <div class="mdw-months-container">
        <div class="mdw-month-days-header">
          ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
        </div>
        <div class="mdw-month-days-container mdw-active">${this.#monthDaysTemplate()}</div>
        <div class="mdw-month-days-container">${this.#monthDaysTemplate()}</div>
      </div>

      <div class="mdw-years-container">
        ${dateUtil.defaultYearRange().map(year => `<div class="mdw-year" mdw-year="${year}">${year}</div>`).join('\n') }
      </div>
    `;
  }

  #monthDaysTemplate(date = this.#displayDate) {
    const valueFormatted = this.#value && dateUtil.format(this.#value, 'YYYY-MM-dd');
    return dateUtil.getMonthDays(date, {
      fillNextMonth: true
      // minDate: MDWDateUtil.parse(this.minDate),
      // maxDate: MDWDateUtil.parse(this.maxDate)
    }).map(week => week.map(({ display, date, currentMonth, interactive, beforeMinDate, afterMaxDate, isToday }) => {
      let classes = 'mdw-month-day';
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

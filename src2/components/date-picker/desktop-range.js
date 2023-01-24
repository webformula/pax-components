import MDWPanelElement from '../panel/component.js';
import dateUtil from '../../core/dateUtil.js';
import util from '../../core/util.js';
import './desktop-range.css';
import arrowDropDownIconSVGRaw from '../../svg-icons/arrow_drop_down_FILL1_wght400_GRAD0_opsz24.svg';
import chevronLeftIconSVGRaw from '../../svg-icons/chevron_left_FILL1_wght400_GRAD0_opsz24.svg';
import chevronRightSVGRaw from '../../svg-icons/chevron_right_FILL1_wght400_GRAD0_opsz24.svg';
import { checkMinMax, monthDaysRangeTemplate } from './helper.js';



// TODO input min max
// TODO figure out scroll range
// TODO clear
// TODO input change

customElements.define('mdw-date-picker-range-desktop', class MDWDatePickerRangeDesktopElement extends MDWPanelElement {
  useTemplate = false;

  // #showInputView_bound = this.#showInputView.bind(this);
  // #onInputStart_bound = util.debounce(this.#onInputStart, 100).bind(this);
  // #onInputEnd_bound = util.debounce(this.#onInputEnd, 100).bind(this);
  #cancel_bound = this.#cancel.bind(this);
  #ok_bound = this.#ok.bind(this);
  #dayClick_bound = this.#dayClick.bind(this);
  #onShow_bound = this.#onShow.bind(this);
  #onClose_bound = this.#onClose.bind(this);
  #selectedDateA;
  #selectedDateB;

  constructor() {
    super();

    this.clickOutsideClose = false;
    this.backdrop = false;
    this.animation = 'opacity';
    this.target = this.parentElement.parentElement;
    this.addClickOutsideCloseIgnore(this.parentElement.control);
  }

  afterRender() {
    this.querySelector('.mdw-ok').addEventListener('click', this.#ok_bound);
    this.querySelector('.mdw-cancel').addEventListener('click', this.#cancel_bound);
    this.addEventListener('open', this.#onShow_bound);
    this.querySelector('.mdw-month-range-container').addEventListener('click', this.#dayClick_bound);
  }

  disconnectedCallback() {
    this.querySelector('.mdw-ok').removeEventListener('click', this.#ok_bound);
    this.querySelector('.mdw-cancel').removeEventListener('click', this.#cancel_bound);
    this.removeEventListener('close', this.#onClose_bound);
    this.removeEventListener('open', this.#onShow_bound);
    this.querySelector('.mdw-month-range-container').removeEventListener('click', this.#dayClick_bound);
  }

  get #valueStart() {
    return this.parentElement.valueStart;
  }
  set #valueStart(value) {
    this.parentElement.valueStart = value;
  }

  get #valueEnd() {
    return this.parentElement.valueEnd;
  }
  set #valueEnd(value) {
    this.parentElement.valueEnd = value;
  }

  get #displayDateStart() {
    return this.parentElement.displayDateStart;
  }
  set #displayDateStart(value) {
    this.parentElement.displayDateStart = value;
  }

  get #displayDateEnd() {
    return this.parentElement.displayDateEnd;
  }
  set #displayDateEnd(value) {
    this.parentElement.displayDateEnd = value;
  }

  get #initialValueStart() {
    return this.parentElement.initialValueStart;
  }

  get #initialValueEnd() {
    return this.parentElement.initialValueEnd;
  }

  get #valueDateStart() {
    return this.parentElement.valueDateStart;
  }
  set #valueDateStart(value) {
    this.parentElement.valueDateStart = value;
  }

  get #valueDateEnd() {
    return this.parentElement.valueDateEnd;
  }
  set #valueDateEnd(value) {
    this.parentElement.valueDateEnd = value;
  }

  get #minDate() {
    return this.parentElement.minDate;
  }

  get #maxDate() {
    return this.parentElement.maxDate;
  }

  template() {
    const {
      previousYearOutOfRange,
      nextYearOutOfRange,
      previousMonthOutOfRange,
      nextMonthOutOfRange
    } = checkMinMax(this.#minDate, this.#maxDate, this.#displayDateStart);

    return /*html*/`
      <div class="mdw-month-range-container">
        <div class="mdw-month-container-start">
          <div class="mdw-control-container">
            <div class="mdw-month-previous mdw-icon-svg" ${previousMonthOutOfRange ? 'disabled' : ''}>${chevronLeftIconSVGRaw}</div>
            <div class="mdw-month-drop-down" ${previousMonthOutOfRange && nextMonthOutOfRange ? 'disabled' : ''}>
              <div class="mdw-month-label">${dateUtil.format(this.#displayDateStart, 'MMMM')}</div>
            </div>
            <div class="mdw-year-drop-down" ${previousYearOutOfRange && nextYearOutOfRange ? 'disabled' : ''}>
              <div class="mdw-year-label">${dateUtil.getYear(this.#displayDateStart)}</div>
            </div>
          </div>

          <div class="mdw-month">
            <div class="mdw-days-header">
              ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
            </div>

            <div class="mdw-days-container mdw-active">${this.#monthDaysTemplate(this.#displayDateStart)}</div>
            <div class="mdw-days-container">${this.#monthDaysTemplate(this.#displayDateStart)}</div>
          </div>
        </div>

        <div class="mdw-month-container-end">
          <div class="mdw-control-container">
            <div class="mdw-month-drop-down" ${previousMonthOutOfRange && nextMonthOutOfRange ? 'disabled' : ''}>
              <div class="mdw-month-label">${dateUtil.format(this.#displayDateEnd, 'MMMM')}</div>
            </div>
            <div class="mdw-year-drop-down" ${previousYearOutOfRange && nextYearOutOfRange ? 'disabled' : ''}>
              <div class="mdw-year-label">${dateUtil.getYear(this.#displayDateEnd)}</div>
            </div>
            <div class="mdw-year-next mdw-icon-svg" ${nextYearOutOfRange ? 'disabled' : ''}>${chevronRightSVGRaw}</div>
          </div>
          <div class="mdw-month">
            <div class="mdw-days-header">
              ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
            </div>

            <div class="mdw-days-container mdw-active">${this.#monthDaysTemplate(this.#displayDateEnd)}</div>
            <div class="mdw-days-container">${this.#monthDaysTemplate(this.#displayDateEnd)}</div>
          </div>
        </div>
      </div>

      <div class="mdw-actions">
        <mdw-button class="mdw-clear">Clear</mdw-button>
        <mdw-button class="mdw-cancel">Cancel</mdw-button>
        <mdw-button class="mdw-ok">OK</mdw-button>
      </div>
    `;
  }

  #monthDaysTemplate(date) {
    return monthDaysRangeTemplate(date, this.#valueStart, this.#valueEnd, this.#minDate, this.#maxDate, false);
  }

  #onShow() {
    this.addEventListener('close', this.#onClose_bound);
    // const current = this.querySelector('.mdw-month.current');
    // if (current) {
    //   current.scrollIntoView({ block: 'center' });
    //   this.addEventListener('close', this.#onClose_bound);
    //   this.querySelector('.mdw-month-range-container').addEventListener('scroll', this.#onScroll_throttle);
    // }

    const selectedStart = this.querySelector('.mdw-day.mdw-interactive[selected][start]');
    if (selectedStart) this.#selectedDateA = dateUtil.parse(selectedStart.getAttribute('mdw-date'));
    const selectedEnd = this.querySelector('.mdw-day.mdw-interactive[selected][start]');
    if (selectedEnd) this.#selectedDateB = dateUtil.parse(selectedEnd.getAttribute('mdw-date'));
  }

  #onClose() {
    this.removeEventListener('close', this.#onClose_bound);
  }

  #ok() {
    this.close();
  }

  #cancel() {
    this.#valueStart = this.#initialValueStart;
    this.#valueEnd = this.#initialValueEnd;
    this.#render();
    this.close();
  }

  #dayClick(event) {
    if (!event.target.classList.contains('mdw-day')) return;
    this.#updateDisplayDate(dateUtil.parse(event.target.getAttribute('mdw-date')));
  }

  #updateDisplayDate(date) {
    if (this.#selectedDateB) {
      this.#selectedDateA = date;
      this.#selectedDateB = undefined;

      this.#valueDateStart = '';
      this.#valueDateEnd = '';

      const selectedA = this.querySelector(`.mdw-day[mdw-date="${dateUtil.format(date, 'YYYY-MM-DD')}"]`);
      if (selectedA) selectedA.setAttribute('selected', '');
    } else {
      this.#selectedDateB = date;
      const selectedA = this.querySelector('.mdw-day.mdw-interactive[selected]');
      const selectedADate = dateUtil.parse(selectedA.getAttribute('mdw-date'));
      const selectedB = this.querySelector(`.mdw-day[mdw-date="${dateUtil.format(date, 'YYYY-MM-DD')}"]`);
      selectedB.setAttribute('selected', '');
      if (selectedADate.getTime() > date.getTime()) {
        selectedA.setAttribute('start', '');
        selectedB.setAttribute('end', '');
        this.#valueDateStart = date;
        this.#valueDateEnd = selectedADate;
      } else {
        selectedB.setAttribute('start', '');
        selectedA.setAttribute('end', '');
        this.#valueDateStart = selectedADate;
        this.#valueDateEnd = date;
      }
    }

    this.#render();
  }

  #render(clearSelected = true) {
    if (clearSelected) {
      const selectedStart = this.querySelector('[selected][start]');
      if (selectedStart) {
        selectedStart.removeAttribute('selected');
        selectedStart.removeAttribute('start');
      }
      const selectedEnd = this.querySelector('[selected][end]');
      if (selectedEnd) {
        selectedEnd.removeAttribute('selected');
        selectedEnd.removeAttribute('end');
      }

      this.querySelector('.mdw-month-container-start .mdw-month-label').innerText = '';
      this.querySelector('.mdw-month-container-start .mdw-year-label').innerText = '';
      this.querySelector('.mdw-month-container-end .mdw-month-label').innerText = '';
      this.querySelector('.mdw-month-container-end .mdw-year-label').innerText = '';
    }

    [...this.querySelectorAll('[in-selection-range]')].forEach(d => d.removeAttribute('in-selection-range'));

    if (dateUtil.isValid(this.#valueDateStart)) {
      this.querySelector('.mdw-month-container-start .mdw-month-label').innerText = dateUtil.format(this.#displayDateStart, 'MMMM');
      this.querySelector('.mdw-month-container-start .mdw-year-label').innerText = dateUtil.getYear(this.#displayDateStart);
    }

    if (dateUtil.isValid(this.#valueDateEnd)) {
      this.querySelector('.mdw-month-container-end .mdw-month-label').innerText = dateUtil.format(this.#valueDateEnd, 'MMMM');
      this.querySelector('.mdw-month-container-end .mdw-year-label').innerText = dateUtil.getYear(this.#valueDateEnd);
    }

    if (!dateUtil.isValid(this.#valueDateStart) || !dateUtil.isValid(this.#valueDateEnd)) return;

    this.querySelector('.mdw-month-container-start .mdw-days-container.mdw-active').innerHTML = this.#monthDaysTemplate(this.#valueDateStart);
    this.querySelector('.mdw-month-container-end .mdw-days-container.mdw-active').innerHTML = this.#monthDaysTemplate(this.#valueDateEnd);
  }
});

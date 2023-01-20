import MDWPanelElement from '../panel/component.js';
import dateUtil from '../../core/dateUtil.js';
import util from '../../core/util.js';
import './desktop-range.css';
import arrowDropDownIconSVGRaw from '../../svg-icons/arrow_drop_down_FILL1_wght400_GRAD0_opsz24.svg';
import chevronLeftIconSVGRaw from '../../svg-icons/chevron_left_FILL1_wght400_GRAD0_opsz24.svg';
import chevronRightSVGRaw from '../../svg-icons/chevron_right_FILL1_wght400_GRAD0_opsz24.svg';
import { checkMinMax, monthDaysTemplate } from './helper.js';



// TODO input min max
// TODO figure out scroll range

customElements.define('mdw-date-picker-range-desktop', class MDWDatePickerRangeDesktopElement extends MDWPanelElement {
  useTemplate = false;

  // #showInputView_bound = this.#showInputView.bind(this);
  // #onInputStart_bound = util.debounce(this.#onInputStart, 100).bind(this);
  // #onInputEnd_bound = util.debounce(this.#onInputEnd, 100).bind(this);
  // #cancel_bound = this.#cancel.bind(this);
  // #ok_bound = this.#ok.bind(this);
  // #dayClick_bound = this.#dayClick.bind(this);
  // #onShow_bound = this.#onShow.bind(this);
  // #onClose_bound = this.#onClose.bind(this);
  // #onScroll_throttle = util.rafThrottle(this.#onScroll.bind(this));
  #selectedDateA;
  #selectedDateB;

  constructor() {
    super();

    this.clickOutsideClose = false;
    this.backdrop = false;
    this.animation = 'opacity';
    this.addClickOutsideCloseIgnore(this.parentElement.control);
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
        <div class="mdw-month-container-a">
          <div class="mdw-control-container">
            <div class="mdw-month-previous mdw-icon-svg" ${previousMonthOutOfRange ? 'disabled' : ''}>${chevronLeftIconSVGRaw}</div>
            <div class="mdw-month-drop-down" ${previousMonthOutOfRange && nextMonthOutOfRange ? 'disabled' : ''}>
              <div class="mdw-month-label">${dateUtil.format(this.#displayDateStart, 'MMMM')}</div>
              <div class="mdw-icon-svg">${arrowDropDownIconSVGRaw}</div>
            </div>
            <div class="mdw-year-drop-down" ${previousYearOutOfRange && nextYearOutOfRange ? 'disabled' : ''}>
              <div class="mdw-year-label">${dateUtil.getYear(this.#displayDateStart)}</div>
              <div class="mdw-icon-svg">${arrowDropDownIconSVGRaw}</div>
            </div>
          </div>

          <div class="mdw-month-days-container">
            <div class="mdw-days-header">
              ${dateUtil.getDayNames('narrow').map(n => `<span>${n}</span>`).join('\n')}
            </div>

            <div class="mdw-days-container mdw-active">${this.#monthDaysTemplate(this.#displayDateStart)}</div>
            <div class="mdw-days-container">${this.#monthDaysTemplate(this.#displayDateStart)}</div>
          </div>
        </div>

        <div class="mdw-month-container-b">
          <div class="mdw-control-container">
            <div class="mdw-month-drop-down" ${previousMonthOutOfRange && nextMonthOutOfRange ? 'disabled' : ''}>
              <div class="mdw-month-label">${dateUtil.format(this.#displayDateEnd, 'MMMM')}</div>
              <div class="mdw-icon-svg">${arrowDropDownIconSVGRaw}</div>
            </div>
            <div class="mdw-year-drop-down" ${previousYearOutOfRange && nextYearOutOfRange ? 'disabled' : ''}>
              <div class="mdw-year-label">${dateUtil.getYear(this.#displayDateEnd)}</div>
              <div class="mdw-icon-svg">${arrowDropDownIconSVGRaw}</div>
            </div>
            <div class="mdw-year-next mdw-icon-svg" ${nextYearOutOfRange ? 'disabled' : ''}>${chevronRightSVGRaw}</div>
          </div>
          <div class="mdw-month-days-container">
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
    return monthDaysTemplate(date, this.#valueStart, this.#minDate, this.#maxDate, true, true);
  }
});

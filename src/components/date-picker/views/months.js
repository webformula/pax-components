import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);
    this.bound_scrolling = this.scrolling.bind(this);

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.displayDate = MDWDateUtil.parse(this.getAttribute('mdw-display-date') || this.today);
    this.monthList = MDWDateUtil.getMonthsSurroundingYear(this.displayDate);

    this.cloneTemplate(true);
  }

  connectedCallback() {
    this.navButtonLeft.addEventListener('click', this.bound_prevMonth);
    this.navButtonRight.addEventListener('click', this.bound_nextMonth);
    this.forEachMonth(el => {
      // give reference to this compnent
      el.parentComponent = this;
      if (el.year === MDWDateUtil.getYear(this.displayDate) && el.month === MDWDateUtil.getMonth(this.displayDate)) el.setCurrent();
    });
  }

  disconnectedCallback() {
    this.navButtonLeft.removeEventListener('click', this.bound_prevMonth);
    this.navButtonRight.removeEventListener('click', this.bound_nextMonth);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-display-date':
        if (!newValue) return;

        this.displayDate = MDWDateUtil.parse(newValue);
        this.monthList = MDWDateUtil.getMonthsSurroundingYear(this.displayDate);
        // this.render();
        this.updateDisplay();
        this.scrollToCurrentMonth();
        break;

      case 'mdw-selected-date':
        if (!newValue) return;

        this.selectedDate = MDWDateUtil.parse(newValue);
        this.updateDisplay();
        break;
    }
  }

  get scrollContainer() {
    return this.shadowRoot.querySelector('.mdw-date-picker--view-month-single-container');
  }

  get navButtonLeft() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-nav-buttons--left');
  }

  get navButtonRight() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-nav-buttons--right');
  }

  forEachMonth(callback) {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--view-month-single')].forEach(callback);
  }

  updateDisplay() {
    this.forEachMonth(el => {
      el.updateDisplay(this.displayDate, this.selectedDate);
    });
  }

  dispatchChange({ year, month, day }) {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
      detail: {
        year,
        month,
        day
      }
    }));
  }

  scrollToCurrentMonth() {
    const current = this.shadowRoot.querySelector('[mdw-current-month]');
    if (!current) return;

    const moveBy = current.offsetWidth;
    this._targetScrollLeft = this.scrollContainer.scrollLeft + moveBy;
    this.scrollContainer.addEventListener('scroll', this.bound_scrolling);
    this.scrollContainer.scrollBy({
      top: 0,
      left: moveBy,
      behavior: 'smooth'
    });
  }

  nextMonth() {
    if (this._moving) return;
    this._moving = true;

    const current = this.shadowRoot.querySelector('[mdw-current-month]');
    console.log(current);
    const next = current.nextElementSibling;
    console.log(next);
    if (!next || next.nodeName !== 'MDW-DATE-PICKER--VIEW-MONTH-SINGLE') return;
    current.setCurrent(false);
    next.setCurrent(true);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      detail: {
        year: next.year,
        month: next.month
      }
    }));
  }

  prevMonth() {
    if (this._moving) return;
    this._moving = true;

    const current = this.shadowRoot.querySelector('[mdw-current-month]');
    const prev = current.previousElementSibling;
    if (!prev || prev.nodeName !== 'MDW-DATE-PICKER--VIEW-MONTH-SINGLE') return;
    current.setCurrent(false);
    prev.setCurrent(true);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      detail: {
        year: prev.year,
        month: prev.month
      }
    }));
  }

  scrolling(event) {
    if (event.currentTarget.scrollLeft !== this._targetScrollLeft) return;
    this.scrollContainer.removeEventListener('scroll', this.bound_scrolling);
    this._moving = false;
  }

  template() {
    return `
      <div class="mdw-date-picker--body-nav-buttons-container">
        <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons mdw-date-picker--body-nav-buttons--left">
          <mdw-icon>keyboard_arrow_left</mdw-icon>
        </mdw-button>

        <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons mdw-date-picker--body-nav-buttons--right">
          <mdw-icon>keyboard_arrow_right</mdw-icon>
        </mdw-button>
      </div>

      <div mdw-row mdw-wrap style="justify-content: space-between;" class="mdw-date-picker--view-month">
        <div class="mdw-date-picker--view-month-day-header">
          ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
        </div>

        <div class="mdw-date-picker--view-month-single-container">
          <div class="mdw-date-picker--view-month-single-scroll-container">
            ${this.monthList.map(monthDate => `<mdw-date-picker--view-month-single mdw-date="${monthDate}"></mdw-date-picker--view-month-single>`).join('\n')}
          </div>
        </div>
      </div>
    `;
  }

  styles() {
    return `
      :host {
        margin-top: 22px;
      }

      .mdw-date-picker--view-month-single-container {
        overflow: hidden;
      }

      .mdw-date-picker--view-month-single-scroll-container {
        display: flex;
        flex-direction: row;
      }

      .mdw-date-picker--view-month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 20px;
        margin-bottom: 8px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }

      .mdw-date-picker--body-nav-buttons-container {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
        position: absolute;
        margin-top: -53px;
        margin-left: 208px;
      }

      .mdw-date-picker--body-nav-buttons {
        color: var(--mdw-theme-text--body);
      }

      .mdw-date-picker--body-year-button.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }
    `;
  }
});

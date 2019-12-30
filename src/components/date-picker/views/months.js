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
    this.monthList = MDWDateUtil.getMonthsSurroundingYear(MDWDateUtil.today());

    this.cloneTemplate();
  }

  connectedCallback() {
    this.navButtonLeft.addEventListener('click', this.bound_prevMonth);
    this.navButtonRight.addEventListener('click', this.bound_nextMonth);

    this.forEachMonth(el => {
      // give reference to this compnent
      el.parentComponent = this;
    });
  }

  disconnectedCallback() {
    this.navButtonLeft.removeEventListener('click', this.bound_prevMonth);
    this.navButtonRight.removeEventListener('click', this.bound_nextMonth);
  }

  static get observedAttributes() {
    return ['mdw-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'mdw-date':
        if (!newValue) return;

        this._selectedDate = MDWDateUtil.parse(newValue || MDWDateUtil.today());
        this.updateDisplay(this._selectedDate);
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

  updateDisplay(selectedDate, preventDaySelect) {
    this.forEachMonth(el => {
      el.updateDisplay(selectedDate, preventDaySelect);
    });
    this.scrollToCurrentMonth();
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
    let el = this.shadowRoot.querySelector('[mdw-current-month]');
    if (!el) el = this.shadowRoot.querySelector('[mdw-today-month]');
    this.scrollContainer.scrollTo(el.offsetLeft, 0);
  }

  nextMonth() {
    if (this._moving) return;
    this._moving = true;

    let current = this.shadowRoot.querySelector('[mdw-current-month]');
    if (!current) current = this.shadowRoot.querySelector('[mdw-today-month]');
    const next = current.nextElementSibling;
    if (!next || next.nodeName !== 'MDW-DATE-PICKER--VIEW-MONTH-SINGLE') return;
    current.setCurrent(false);
    next.setCurrent(true);
    const moveBy = current.offsetWidth;
    this._targetScrollLeft = this.scrollContainer.scrollLeft + moveBy;
    this.scrollContainer.addEventListener('scroll', this.bound_scrolling);
    this.scrollContainer.scrollBy({
      top: 0,
      left: moveBy,
      behavior: 'smooth'
    });

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

    let current = this.shadowRoot.querySelector('[mdw-current-month]');
    if (!current) current = this.shadowRoot.querySelector('[mdw-today-month]');
    const prev = current.previousElementSibling;
    if (!prev || prev.nodeName !== 'MDW-DATE-PICKER--VIEW-MONTH-SINGLE') return;
    current.setCurrent(false);
    prev.setCurrent(true);
    this._targetScrollLeft = this.scrollContainer.scrollLeft - prev.offsetWidth;
    this.scrollContainer.addEventListener('scroll', this.bound_scrolling);
    this.scrollContainer.scrollBy({
      top: 0,
      left: -prev.offsetWidth,
      behavior: 'smooth'
    });

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      detail: {
        year: prev.year,
        month: prev.month
      }
    }));
  }

  scrolling(event) {
    if (event.currentTarget.scrollLeft !== this._targetScrollLeft) return;
    this.scrollContainer.addEventListener('scroll', this.bound_scrolling);
    this._moving = false;
  }

  // monthDayChanged({ detail }) {
  //   const date = MDWDateUtil.buildFromParts({
  //     year: MDWDateUtil.parse(this.selectedDate).getFullYear(),
  //     month: detail.month,
  //     day: detail.day
  //   });
  //   this.setAttribute('mdw-selected-date', date);
  //   this.dispatchEvent(new CustomEvent('MDWDatePicker:monthDayChanged', {
  //     detail
  //   }));
  // }

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
        margin-bottom: 12px;
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

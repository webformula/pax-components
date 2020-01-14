import { HTMLElementExtended, html, css } from '@webformula/pax-core';
import MDWDateUtil from '../../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month-single--mobile', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);
    this.bound_yearClick = this.yearClick.bind(this);

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.cloneTemplate(true);
  }

  addEvents() {
    this.navButtonLeft.addEventListener('click', this.bound_prevMonth);
    this.navButtonRight.addEventListener('click', this.bound_nextMonth);
    this.yearButton.addEventListener('click', this.bound_yearClick);
  }

  removeEvents() {
    this.navButtonLeft.removeEventListener('click', this.bound_prevMonth);
    this.navButtonRight.removeEventListener('click', this.bound_nextMonth);
    this.yearButton.removeEventListener('click', this.bound_yearClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-max-date':
      case 'mdw-min-date':
      case 'mdw-selected-date':
      case 'mdw-display-date':
        this.render();
        break;
    }
  }


  get displayDate() {
    return MDWDateUtil.parse(this.getAttribute('mdw-display-date') || this.today);
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date') || '';
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date') || '';
  }

  get navButtonLeft() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-nav-buttons--left');
  }

  get navButtonRight() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-nav-buttons--right');
  }

  get yearButton() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-year-view-button');
  }

  yearClick() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:showYearView', {
      composed: true
    }));
  }

  nextMonth() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:nextMonth', {
      composed: true
    }));
  }

  prevMonth() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:previousMonth', {
      composed: true
    }));
  }

  template() {
    return html`
      <div class="mdw-date-picker--controls-container">
        <div class="mdw-date-picker--body-year-view-button">
          <div id="month-year-dropdown">${MDWDateUtil.format(this.displayDate, 'MMMM YYYY')}</div>
          <i class="mdw-select__icon"></i>
        </div>

        <div class="mdw-date-picker--body-nav-buttons-container">
          <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons mdw-date-picker--body-nav-buttons--left">
            <mdw-icon>keyboard_arrow_left</mdw-icon>
          </mdw-button>

          <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons mdw-date-picker--body-nav-buttons--right">
            <mdw-icon>keyboard_arrow_right</mdw-icon>
          </mdw-button>
        </div>
      </div>

      <div class="mdw-date-picker--view-month-day-header">
        ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <mdw-date-picker--view-month-single
        mdw-display-date="${this.displayDate}"
        mdw-selected-date="${this.selectedDate}"
        mdw-min-date="${this.minDate}"
        mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--view-month-single>
    `;
  }

  styles() {
    return css`
      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 4px;
        padding-top: 4px;
      }

      .mdw-date-picker--body-year-view-button {
        margin-left: 24px;
        position: relative;
        padding-right: 28px;
        cursor: pointer;
        color: var(--mdw-theme-text--body);
        display: flex;
        justify-content: space-between;
      }

      .mdw-date-picker--body-year-view-button .mdw-select__icon {
        right: 8px;
        top: 7px;
        width: 0;
        height: 0;
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--mdw-theme-text--body);
      }

      .mdw-date-picker--body-nav-buttons-container {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
      }

      .mdw-date-picker--body-nav-buttons {
        color: var(--mdw-theme-text--body);
      }

      .mdw-date-picker--view-month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        margin-left: 12px;
        margin-right: 12px;
        line-height: 40px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }
    `;
  }
});

import { HTMLElementExtended, html, css } from '@webformula/pax-core';
import MDWDateUtil from '../../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month--desktop', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.cloneTemplate(true);
  }

  addEvents() {
    this.navButtonLeft.addEventListener('click', this.bound_prevMonth);
    this.navButtonRight.addEventListener('click', this.bound_nextMonth);

    this.yearDropdown.addEventListener('click', this.bound_yearClick);
  }

  removeEvents() {
    this.navButtonLeft.removeEventListener('click', this.bound_prevMonth);
    this.navButtonRight.removeEventListener('click', this.bound_nextMonth);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.activeMonth.setAttribute('mdw-display-date', newValue);

        // set year dropdown
        this.yearDropdown.innerHTML = MDWDateUtil.format(MDWDateUtil.parse(newValue), 'MMMM YYYY');
        break;

      case 'mdw-selected-date':
        this.activeMonth.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-min-date':
        this.activeMonth.setAttribute('mdw-min-date', newValue);
        this.nonActiveMonth.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        this.activeMonth.setAttribute('mdw-max-date', newValue);
        this.nonActiveMonth.setAttribute('mdw-max-date', newValue);
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
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  get activeMonth() {
    return this.shadowRoot.querySelector('.mdw-active-month');
  }

  get nonActiveMonth() {
    return this.shadowRoot.querySelector('mdw-date-picker--view-month-single:not(.mdw-active-month)');
  }

  get navButtonLeft() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-nav-buttons--left');
  }

  get navButtonRight() {
    return this.shadowRoot.querySelector('.mdw-date-picker--body-nav-buttons--right');
  }

  get yearDropdown() {
    return this.shadowRoot.querySelector('#month-year-dropdown');
  }

  yearClick() {
    this.dispatchEvent(new CustomEvent('MDWDatePicker:showYearView', {
      composed: true
    }));
  }

  nextMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--view-month-single.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--view-month-single:not(.mdw-active-month)');

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(16px)';

    notActive.setAttribute('mdw-display-date', MDWDateUtil.buildFromParts({ year: active.year, month: active.month + 1 }));
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(-16px)';
      active.style.opacity = '0';

      notActive.style.transition = '';
      notActive.style[MDWUtils.transformPropertyName] = '';
      notActive.style.opacity = '1';
    }, 42);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      composed: true,
      detail: {
        year: notActive.year,
        month: notActive.month
      }
    }));
  }

  prevMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--view-month-single.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--view-month-single:not(.mdw-active-month)');

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(-16px)';

    notActive.setAttribute('mdw-display-date', MDWDateUtil.buildFromParts({ year: active.year, month: active.month - 1 }));
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(16px)';
      active.style.opacity = '0';

      notActive.style.transition = '';
      notActive.style[MDWUtils.transformPropertyName] = '';
      notActive.style.opacity = '1';
    }, 42);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      composed: true,
      detail: {
        year: notActive.year,
        month: notActive.month
      }
    }));
  }

  template() {
    return html`
      <div class="mdw-date-picker--controls-container">
        <div class="mdw-date-picker--body-year-view-button">
          <div id="month-year-dropdown">${MDWDateUtil.format(MDWDateUtil.buildFromParts({ year: this.selectedYear, month: this.selectedMonth }), 'MMMM YYYY')}</div>
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

      <div class="mdw-date-picker--desktop-months-container">
        <mdw-date-picker--view-month-single class="mdw-active-month"
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
          ></mdw-date-picker--view-month-single>
        <mdw-date-picker--view-month-single
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
          ></mdw-date-picker--view-month-single>
      </div>
    `;
  }

  styles() {
    return css`
      .mdw-date-picker--view-month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 12px;
        margin-bottom: 8px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }

      .mdw-date-picker--desktop-months-container {
        position: relative;
        height: 260px;
      }

      .mdw-date-picker--body-nav-buttons-container {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
      }

      .mdw-date-picker--body-nav-buttons {
        color: var(--mdw-theme-text--body);
      }

      .mdw-date-picker--body-year-button.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }

      mdw-date-picker--view-month-single {
        position: absolute;
        transform: translateX(0);
        opacity: 0;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .mdw-active-month {
        opacity: 1;
      }

      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    `;
  }
});

import { HTMLElementExtended, html, css } from '@webformula/pax-core';
import MDWDateUtil from '../../../../core/DateUtil.js';

customElements.define('mdw-date-picker--desktop', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);
    this.bound_showYearView = this.showYearView.bind(this);
    this.bound_onYearChange = this.onYearChange.bind(this);

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.yearList = MDWDateUtil.defaultYearRange();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.navButtonRight.addEventListener('click', this.bound_nextMonth);
    this.navButtonLeft.addEventListener('click', this.bound_prevMonth);
    this.yearButton.addEventListener('click', this.bound_showYearView);
  }

  removeEvents() {
    this.navButtonRight.removeEventListener('click', this.bound_nextMonth);
    this.navButtonLeft.removeEventListener('click', this.bound_prevMonth);
    this.yearButton.removeEventListener('click', this.bound_showYearView);
    this.yearView && this.yearView.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.updateDisplayDate(newValue);
        break;

      case 'mdw-selected-date':
        this.updateSelectedDate(newValue);
        break;
    //
    //   case 'mdw-min-date':
    //     this.activeMonth.setAttribute('mdw-min-date', newValue);
    //     this.nonActiveMonth.setAttribute('mdw-min-date', newValue);
    //     break;
    //
    //   case 'mdw-max-date':
    //     this.activeMonth.setAttribute('mdw-max-date', newValue);
    //     this.nonActiveMonth.setAttribute('mdw-max-date', newValue);
    //     break;
    }
  }

  updateDisplayDate(dateString) {
    switch(this._currentView) {
      case 'month':
        this.activeMonth.setAttribute('mdw-display-date', dateString);
        break;

      case 'year':
        this.yearView.setAttribute('mdw-display-date', dateString);
        break;
    }

    // update year button
    const date = MDWDateUtil.parse(dateString);
    if (MDWDateUtil.isValid(date)) this.yearButton.innerHTML = MDWDateUtil.format(date, 'MMMM YYYY');
  }

  updateSelectedDate(dateString) {
    switch(this._currentView) {
      case 'month':
        this.activeMonth.setAttribute('mdw-selected-date', dateString);
        break;

      case 'year':
        this.yearView.setAttribute('mdw-selected-date', dateString);
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get activeMonth() {
    return this.shadowRoot.querySelector('mdw-date-picker--month-days.mdw-active-month');
  }

  get nonActiveMonth() {
    return this.shadowRoot.querySelector('mdw-date-picker--month-days:not(.mdw-active-month)');
  }

  get yearView() {
    return this.shadowRoot.querySelector('mdw-date-picker--year');
  }

  get navButtonLeft() {
    return this.shadowRoot.querySelector('.mdw-date-picker--nav-buttons--left');
  }

  get navButtonRight() {
    return this.shadowRoot.querySelector('.mdw-date-picker--nav-buttons--right');
  }

  get yearButton() {
    return this.shadowRoot.querySelector('#month-year-button');
  }

  get viewContainer() {
    return this.shadowRoot.querySelector('.mdw-date-picker--views');
  }

  onYearChange() {
    setTimeout(() => {
      this.showMonthView();
    }, 0);
  }

  showYearView() {
    this.viewContainer.innerHTML = this._yearTemplate();
    this.yearView.addEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
  }

  showMonthView() {
    this.yearView && this.yearView.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    this.viewContainer.innerHTML = this._monthTemplate();
  }

  nextMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--month-days.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--month-days:not(.mdw-active-month)');
    const nextDate = MDWDateUtil.adjustDate(MDWDateUtil.parse(active.displayDate), { add: { month: 1 } });

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(16px)';

    notActive.setAttribute('mdw-display-date', nextDate);
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');
    notActive.style.display = '';

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(-16px)';
      active.style.opacity = '0';

      notActive.style.transition = '';
      notActive.style[MDWUtils.transformPropertyName] = '';
      notActive.style.opacity = '1';

      active.addEventListener(MDWUtils.transitionEventName, function handler() {
        active.style.display = 'none';
        active.removeEventListener(MDWUtils.transitionEventName, handler);
      });
    }, 42);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      composed: true,
      detail: MDWDateUtil.getParts(nextDate)
    }));
  }

  prevMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--month-days.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--month-days:not(.mdw-active-month)');
    const prevDate = MDWDateUtil.adjustDate(MDWDateUtil.parse(active.displayDate), { add: { month: -1 } });

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(-16px)';

    notActive.setAttribute('mdw-display-date', prevDate);
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');
    notActive.style.display = '';

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(16px)';
      active.style.opacity = '0';

      notActive.style.transition = '';
      notActive.style[MDWUtils.transformPropertyName] = '';
      notActive.style.opacity = '1';

      active.addEventListener(MDWUtils.transitionEventName, function handler() {
        active.style.display = 'none';
        active.removeEventListener(MDWUtils.transitionEventName, handler);
      });
    }, 42);

    this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
      composed: true,
      detail: MDWDateUtil.getParts(prevDate)
    }));
  }

  template() {
    return html`
      <div class="mdw-date-picker--controls-container">
        <div class="mdw-date-picker--year-view-button">
          <div id="month-year-button"></div>
          <i class="mdw-select__icon"></i>
        </div>

        <div class="mdw-date-picker--nav-buttons-container">
          <div>
            <mdw-button class="mdw-icon mdw-date-picker--nav-buttons mdw-date-picker--nav-buttons--left">
              <mdw-icon>keyboard_arrow_left</mdw-icon>
            </mdw-button>

            <mdw-button class="mdw-icon mdw-date-picker--nav-buttons mdw-date-picker--nav-buttons--right">
              <mdw-icon>keyboard_arrow_right</mdw-icon>
            </mdw-button>
          </div>
        </div>
      </div>

      <div class="mdw-date-picker--views">
        ${this._monthTemplate()}
      </div>
    `;
  }

  _monthTemplate() {
    this._currentView = 'month';

    const navButtons = this.shadowRoot.querySelector('.mdw-date-picker--nav-buttons-container > div');
    if (navButtons) navButtons.style.display = '';

    return html`
      <div class="mdw-date-picker--month-day-header">
        ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <div class="mdw-date-picker--months-container">
        <mdw-date-picker--month-days class="mdw-active-month"
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
          ></mdw-date-picker--month-days>
        <mdw-date-picker--month-days
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
          ></mdw-date-picker--month-days>
      </div>
    `;
  }

  _yearTemplate() {
    this._currentView = 'year';

    const navButtons = this.shadowRoot.querySelector('.mdw-date-picker--nav-buttons-container > div');
    if (navButtons) navButtons.style.display = 'none';
    console.log(this.selectedDate);
    return html`
      <mdw-date-picker--year
        mdw-display-date="${this.displayDate}"
        mdw-selected-date="${this.selectedDate}"
        mdw-min-date="${this.minDate}"
        mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--year>
    `;
  }

  styles() {
    return css`
      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .mdw-date-picker--year-view-button {
        margin-left: 24px;
        position: relative;
        padding-right: 28px;
        cursor: pointer;
        color: var(--mdw-theme-text--body);
        display: flex;
        justify-content: space-between;
      }

      .mdw-date-picker--year-view-button .mdw-select__icon {
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

      .mdw-date-picker--nav-buttons-container {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
        height: 48px;
      }

      .mdw-date-picker--nav-buttons {
        color: var(--mdw-theme-text--body);
      }

      .mdw-date-picker--month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        padding: 8px 16px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }

      .mdw-date-picker--months-container {
        overflow: hidden;
        position: relative;
        height: 184px;
        width: 280px;
      }

      mdw-date-picker--month-days {
        position: absolute;
        transform: translateX(0);
        opacity: 0;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .mdw-active-month {
        opacity: 1;
      }
    `;
  }
});

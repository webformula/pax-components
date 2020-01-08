import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month--desktop', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.cloneTemplate(true);
  }

  connectedCallback() {
    this.navButtonLeft.addEventListener('click', this.bound_prevMonth);
    this.navButtonRight.addEventListener('click', this.bound_nextMonth);
  }

  disconnectedCallback() {
    this.navButtonLeft.removeEventListener('click', this.bound_prevMonth);
    this.navButtonRight.removeEventListener('click', this.bound_nextMonth);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        this.activeMonth.setAttribute('mdw-display-date', newValue);
        // TODO change month with animation
        break;

      case 'mdw-selected-date':
        this.activeMonth.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-min-date':
        this.activeMonth.setAttribute('mdw-min-date', newValue);
        this.nonActiveMonth.setAttribute('mdw-min-date', newValue);
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

  nextMonth() {
    const active = this.shadowRoot.querySelector('mdw-date-picker--view-month-single.mdw-active-month');
    const notActive = this.shadowRoot.querySelector('mdw-date-picker--view-month-single:not(.mdw-active-month)');

    notActive.style.transition = 'none';
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(20%)';

    notActive.setAttribute('mdw-display-date', MDWDateUtil.buildFromParts({ year: active.year, month: active.month + 1 }));
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(-20%)';
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
    notActive.style[MDWUtils.transformPropertyName] = 'translateX(-20%)';

    notActive.setAttribute('mdw-display-date', MDWDateUtil.buildFromParts({ year: active.year, month: active.month - 1 }));
    notActive.setAttribute('mdw-selected-date', this.selectedDate);

    // change classes before the event is dispatched so the active month does not change during animation
    active.classList.remove('mdw-active-month');
    notActive.classList.add('mdw-active-month');

    setTimeout(() => {
      active.style[MDWUtils.transformPropertyName] = 'translateX(20%)';
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
    return `
      <div class="mdw-date-picker--body-nav-buttons-container">
        <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons mdw-date-picker--body-nav-buttons--left">
          <mdw-icon>keyboard_arrow_left</mdw-icon>
        </mdw-button>

        <mdw-button class="mdw-icon mdw-date-picker--body-nav-buttons mdw-date-picker--body-nav-buttons--right">
          <mdw-icon>keyboard_arrow_right</mdw-icon>
        </mdw-button>
      </div>

      <div class="mdw-date-picker--view-month-day-header">
        ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
      </div>

      <div class="mdw-date-picker--desktop-months-container" style="position: relative">
        <mdw-date-picker--view-month-single class="mdw-active-month"
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          ></mdw-date-picker--view-month-single>
        <mdw-date-picker--view-month-single
          mdw-fill-month
          mdw-display-date="${this.displayDate}"
          mdw-min-date="${this.minDate}"
          ></mdw-date-picker--view-month-single>
      </div>
    `;
  }

  styles() {
    return `
      .mdw-date-picker--view-month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 40px;
        margin-bottom: 8px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }

      .mdw-date-picker--desktop-months-container {
        position: relative;
      }

      .mdw-date-picker--body-nav-buttons-container {
        display: flex;
        flex-direction: row;
        padding-right: 12px;
        position: absolute;
        margin-top: -32px;
        margin-left: calc(100% - 108px);
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
        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      .mdw-active-month {
        opacity: 1;
      }
    `;
  }
});

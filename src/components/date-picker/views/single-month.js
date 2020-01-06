import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--view-month-single', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onClick = this.onClick.bind(this);
    this.today = MDWDateUtil.today();
    this._setupDate();
    this.cloneTemplate(true);

    if (MDWDateUtil.isSameYear(this.today, this.monthDate) && MDWDateUtil.isSameMonth(this.today, this.monthDate)) {
      const todayElement = this.shadowRoot.querySelector(`[mdw-day="${MDWDateUtil.getMonthDay(this.today)}"]`);
      if (todayElement) todayElement.classList.add('mdw-today');
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-min-date':
      case 'mdw-display-date':
        this._setupDate();
        this.render();
        break;

      case 'mdw-selected-date':
        this._selectDate(MDWDateUtil.parse(newValue));
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  // expecting date string: (new Date()).toString();
  get year() {
    return MDWDateUtil.getYear(this.monthDate);
  }

  get month() {
    return MDWDateUtil.getMonth(this.monthDate);
  }

  get day() {
    return parseInt(this.shadowRoot.querySelector('.mdw-selected').getAttribute('mdw-day'));
  }

  get minDate() {
    const minAttr = this.getAttribute('mdw-min-date');
    return MDWDateUtil.parse(minAttr);
  }

  _setupDate() {
    this.monthDate = MDWDateUtil.parse(this.displayDate);
    this.monthDays = this.monthDate ? MDWDateUtil.getMonthDayArray(this.monthDate, {
      fillInMonth: this.hasAttribute('mdw-fill-month'),
      minDate: this.minDate
    }) : [];
  }

  _selectDate(date) {
    if (MDWDateUtil.getYear(date) !== MDWDateUtil.getYear(this.monthDate) || MDWDateUtil.getMonth(date) !== MDWDateUtil.getMonth(this.monthDate)) return;

    const selectedElement = this.shadowRoot.querySelector(`[mdw-day="${MDWDateUtil.getMonthDay(date)}"]`);
    if (selectedElement) {
      selectedElement.classList.add('mdw-selected');
      this.setCurrent();
    }
  }

  deselect() {
    this.setCurrent(false);
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  setCurrent(value = true) {
    this.toggleAttribute('mdw-current-month', !!value);
  }

  onClick(event) {
    if (event.target.classList.contains('mdw-date-picker--day')) {
      this.deselect();
      this.setCurrent();
      event.target.classList.add('mdw-selected');

      this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
        composed: true,
        detail: {
          year: this.year,
          month: this.month,
          day: this.day
        }
      }));
    }
  }

  template() {
    return `
      <div class="mdw-date-picker--view-month-container">
        ${this.monthDays.map(week => `
          <div class="mdw-date-picker--view-month-week-container">
            ${week.map(({ display, current, beforeMinDate }) => `<div class="mdw-date-picker--day ${current ? '' : 'mdw-next-month'} ${beforeMinDate ? 'mdw-before-min-date' : ''}" mdw-day="${display}">${display}</div>`).join('\n')}
          </div>
        `).join('\n')}
      </div>
    `;
  }

  styles() {
    return `
      :host {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      :host render-block {
        width: 100%;
      }

      .mdw-date-picker--view-month-container {
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        width: calc(100% - 24px);
      }

      .mdw-date-picker--view-month-week-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .mdw-date-picker--day {
        font-size: 13px;
        width: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        color: var(--mdw-theme-text--heading);
        cursor: pointer;
        user-select: none;
        box-sizing: border-box;
      }

      .mdw-date-picker--day.mdw-before-min-date {
        color: rgba(var(--mdw-theme-text--heading--rgb), 0.7);
      }

      .mdw-date-picker--day.mdw-next-month {
        color: rgba(var(--mdw-theme-text--heading--rgb), 0.5);
      }

      .mdw-date-picker--day.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
      }

      .mdw-date-picker--day.mdw-today {
        border: 1px solid var(--mdw-theme-foreground);
      }
    `;
  }
});

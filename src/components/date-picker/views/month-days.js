import { html, css, HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';
import MDWUtils from '../../../core/Utils.js';

customElements.define('mdw-date-picker--month-days', class extends HTMLElementExtended {
  constructor() {
    super();

    if (MDWUtils.isMobile) this.classList.add('mdw-mobile');
    this.bound_onClick = this.onClick.bind(this);
    this.today = MDWDateUtil.today();
    this._setupDate();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.shadowRoot.addEventListener('click', this.bound_onClick);
  }

  removeEvents() {
    this.shadowRoot.removeEventListener('click', this.bound_onClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-min-date':
      case 'mdw-max-date':
      case 'mdw-display-date':
        this._setupDate();
        this.render();
        const selectedDate = this.selectedDate;
        if (selectedDate) this._selectDate(MDWDateUtil.parse(selectedDate));
        break;

      case 'mdw-selected-date':
        this._selectDate(MDWDateUtil.parse(newValue));
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  get shouldFillMonth() {
    return this.hasAttribute('mdw-fill-month');
  }

  _setupDate() {
    this.monthDate = MDWDateUtil.parse(this.displayDate);
    this.monthDays = this.monthDate ? MDWDateUtil.getMonthDayArray(this.monthDate, {
      fillInMonth: this.shouldFillMonth,
      minDate: MDWDateUtil.parse(this.minDate),
      maxDate: MDWDateUtil.parse(this.maxDate)
    }) : [];
  }

  _selectDate(dateObject) {
    this.deselect();
    if (MDWDateUtil.getYear(dateObject) !== MDWDateUtil.getYear(this.monthDate) || MDWDateUtil.getMonth(dateObject) !== MDWDateUtil.getMonth(this.monthDate)) return;

    const { year, month, day } = MDWDateUtil.getParts(dateObject);
    const selectedElement = this.shadowRoot.querySelector(`[mdw-date="${year}-${month}-${day}"]`);
    if (selectedElement) selectedElement.classList.add('mdw-selected');
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  onClick(event) {
    if (!event.target.classList.contains('mdw-date-picker--day') || !event.target.classList.contains('mdw-interactable') || event.target.classList.contains('mdw-out-of-range')) return;

    this.deselect();
    event.target.classList.add('mdw-selected');

    const { year, month, day } = MDWDateUtil.getParts(MDWDateUtil.parse(event.target.getAttribute('mdw-date')));
    this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
      composed: true,
      detail: { year, month, day }
    }));
  }

  template() {
    return html`
      <div class="container">
        ${this.monthDays.map(week => html`
          ${week.map(({ display, day, month, year, current, interactable, beforeMinDate, afterMaxDate, isToday }) => {
            let classes = 'mdw-date-picker--day';
            if (beforeMinDate) classes += ' mdw-before-min-date';
            if (afterMaxDate) classes += ' mdw-after-max-date';
            if (interactable) classes += ' mdw-interactable';
            if (beforeMinDate || afterMaxDate) classes += ' mdw-out-of-range';
            if (isToday && display !== '') classes += ' mdw-today';
            // if (!current) classes += ' mdw-next-month';

            return html`<div class="${classes}" mdw-date="${year}-${month}-${day}">${display}</div>`;
          })}
        `)}
      </div>
    `;
  }

  styles() {
    return css`
      :host {
        width: 100%;
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        pointer-events: none;
      }

      .container {
        display: grid;
        grid-template-columns: repeat(7, 40px);
        grid-template-rows: repeat(6, 36px);
        grid-column-gap: 4px;
        grid-row-gap: 0px;
      }

      :host(.mdw-mobile) .container {
        grid-template-columns: repeat(7, 32px);
        grid-template-rows: repeat(6, 28px);
        grid-column-gap: 0px;
      }

      .mdw-date-picker--day {
        font-size: 13px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        color: var(--mdw-theme-text--heading);
        user-select: none;
        box-sizing: border-box;
      }

      :host(.mdw-mobile) .mdw-date-picker--day {
        line-height: 32px;
      }

      .mdw-date-picker--day.mdw-interactable:not(.mdw-out-of-range) {
        cursor: pointer;
      }

      .mdw-date-picker--day.mdw-before-min-date,
      .mdw-date-picker--day.mdw-after-max-date {
        color: rgba(var(--mdw-theme-text--heading--rgb), 0.7);
      }

      .mdw-date-picker--day.mdw-next-month {
        color: rgba(var(--mdw-theme-text--heading--rgb), 0.5);
      }

      .mdw-date-picker--day.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text--on-primary);
        pointer-events: auto;
      }

      .mdw-date-picker--day.mdw-today {
        border: 1px solid var(--mdw-theme-foreground);
      }
    `;
  }
});

import { HTMLElementExtended, html, css } from '@webformula/pax-core';
import MDWDateUtil from '../../../../core/DateUtil.js';
import MDWUtils from '../../../../core/Utils.js';

customElements.define('mdw-date-picker--view-month--mobile', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_prevMonth = this.prevMonth.bind(this);

    this.today = MDWDateUtil.today();
    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this.cloneTemplate(true);
  }

  addEvents() {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--view-month-single--mobile')].forEach(el => {
      el.addEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
      el.addEventListener('MDWDatePicker:previousMonth', this.bound_prevMonth);
    });
  }

  removeEvents() {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--view-month-single--mobile')].forEach(el => {
      el.removeEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
      el.removeEventListener('MDWDatePicker:previousMonth', this.bound_prevMonth);
    });
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    const activeMonth = this.activeMonth;
    switch(name) {
      case 'mdw-display-date':
        this.render();
        break;

      case 'mdw-selected-date':
        if (activeMonth) activeMonth.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-min-date':
        if (activeMonth) activeMonth.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        if (activeMonth) activeMonth.setAttribute('mdw-max-date', newValue);
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

  get monthsScroller() {
    return this.shadowRoot.querySelector('.mdw-date-picker--view-month--mobile-scroller');
  }

  get activeMonth() {
    return this.shadowRoot.querySelector('.mdw-active-month');
  }

  nextMonth() {
    if (this._isMoving) return;
    this._isMoving = true;

    this.monthsScroller.style.transition = '';
    this.monthsScroller.style[MDWUtils.transformPropertyName] = `translateX(-200%)`;
    this.onChangeComplete(() => {
      const { month, year } = MDWDateUtil.getParts(MDWDateUtil.adjustDate(this.displayDate, { add: { month: 1 } }));
      // this event will cause a render
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: {
          year,
          month
        }
      }));
      this._isMoving = false;
    });
  }

  prevMonth() {
    if (this._isMoving) return;
    this._isMoving = true;

    this.monthsScroller.style.transition = '';
    this.monthsScroller.style[MDWUtils.transformPropertyName] = `translateX(0)`;
    this.onChangeComplete(() => {
      const { month, year } = MDWDateUtil.getParts(MDWDateUtil.adjustDate(this.displayDate, { add: { month: -1 } }));
      // this event will cause a render
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: {
          year,
          month
        }
      }));
      this._isMoving = false;
    });
  }

  onChangeComplete(callback) {
    const monthsScroller = this.monthsScroller;
    monthsScroller.addEventListener(MDWUtils.transitionEventName, function handler() {
      monthsScroller.removeEventListener(MDWUtils.transitionEventName, handler);
      callback();
    });
  }

  template() {
    const displayDateObj = MDWDateUtil.parse(this.displayDate);
    return html`
      <div class="mdw-date-picker--view-month--mobile-container">
        <div class="mdw-date-picker--view-month--mobile-scroller" style="${MDWUtils.transformPropertyName}: translateX(-100%); transition: none;">
          <mdw-date-picker--view-month-single--mobile mdw-display-date="${MDWDateUtil.adjustDate(displayDateObj, { add: { month: -1 } })}"></mdw-date-picker--view-month-single--mobile>
          <mdw-date-picker--view-month-single--mobile class="mdw-active-month" mdw-display-date="${this.displayDate}"></mdw-date-picker--view-month-single--mobile>
          <mdw-date-picker--view-month-single--mobile mdw-display-date="${MDWDateUtil.adjustDate(displayDateObj, { add: { month: 1 } })}"></mdw-date-picker--view-month-single--mobile>
        </div>
      </div>
    `;
  }

  styles() {
    return css`
      .mdw-date-picker--view-month--mobile-container {
        display: flex;
        overflow: hidden;
        width: 100%;
      }

      .mdw-date-picker--view-month--mobile-scroller {
        display: flex;
        width: 100%;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      mdw-date-picker--view-month-single--mobile {
        width: 100%;
        flex-shrink: 0;
      }
    `;
  }
});

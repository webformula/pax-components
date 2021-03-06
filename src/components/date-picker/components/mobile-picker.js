import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';
import MDWUtils from '../../../core/Utils.js';

customElements.define('mdw-date-picker--mobile', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_nextMonth = this.nextMonth.bind(this);
    this.bound_previousMonth = this.previousMonth.bind(this);
    this.bound_onCancel = this.onCancel.bind(this);
    this.bound_onOk = this.onOk.bind(this);
    this.bound_toggleInput = this.toggleInput.bind(this);

    this.dayOfWeekNames = MDWDateUtil.getDayOfWeekNames('narrow');
    this._openingDate = this.selectedDate;

    this.cloneTemplate(true);
  }

  addEvents() {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--month-navigation-buttons')].forEach(el => {
      el.addEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
      el.addEventListener('MDWDatePicker:previousMonth', this.bound_previousMonth);
    });

    this.cancelButton.addEventListener('click', this.bound_onCancel);
    this.okButton.addEventListener('click', this.bound_onOk);
    this.toggleInputButton.addEventListener('click', this.bound_toggleInput);
  }

  removeEvents() {
    [...this.shadowRoot.querySelectorAll('mdw-date-picker--month-navigation-buttons')].forEach(el => {
      el.removeEventListener('MDWDatePicker:nextMonth', this.bound_nextMonth);
      el.removeEventListener('MDWDatePicker:previousMonth', this.bound_previousMonth);
    });

    this.cancelButton.removeEventListener('click', this.bound_onCancel);
    this.okButton.removeEventListener('click', this.bound_onOk);
    this.toggleInputButton.removeEventListener('click', this.bound_toggleInput);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-initial-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    const activeMonth = this.activeMonth;
    switch (name) {
      case 'mdw-display-date':
        this.render();
        break;

      case 'mdw-selected-date':
        const selectedDateFormatted = newValue ? MDWDateUtil.format(MDWDateUtil.parse(newValue), 'ddd, MMM DD') : 'Select date';
        this.headerDate.innerHTML = selectedDateFormatted;
        if (activeMonth) activeMonth.setAttribute('mdw-selected-date', newValue);
        break;

      case 'mdw-initial-date':
        const selectedDate = MDWDateUtil.parse(newValue);
        if (MDWDateUtil.isValid(selectedDate)) this._openingDate = newValue;
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
    return this.getAttribute('mdw-display-date') || '';
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
    return this.shadowRoot.querySelector('.mdw-date-picker--scroll-container');
  }

  get headerDate() {
    return this.shadowRoot.querySelector('.header-date');
  }

  get activeMonth() {
    return this.shadowRoot.querySelector('.mdw-active-month');
  }

  get cancelButton() {
    return this.shadowRoot.querySelector('#cancel-button');
  }

  get okButton() {
    return this.shadowRoot.querySelector('#ok-button');
  }

  get toggleInputButton() {
    return this.shadowRoot.querySelector('#mdw-input-toggle');
  }

  onCancel() {
    // revet date back
    if (this._openingDate) {
      this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
        composed: true,
        detail: MDWDateUtil.getParts(MDWDateUtil.parse(this._openingDate))
      }));
    } else {
      const today = MDWDateUtil.today();
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: MDWDateUtil.getParts(today)
      }));
    }
    this.dispatchEvent(new CustomEvent('MDWDatePicker:close', {
      composed: true
    }));
  }

  onOk() {
    this._openingDate = this.selectedDate;
    this.dispatchEvent(new CustomEvent('MDWDatePicker:close', {
      composed: true
    }));
  }

  setDateFromInput(value) {
    const { month, year, day } = MDWDateUtil.getParts(MDWDateUtil.parse(value));
    // this event will cause a render
    this.dispatchEvent(new CustomEvent('MDWDatePicker:dayChange', {
      composed: true,
      detail: {
        year,
        month,
        day
      }
    }));
  }

  nextMonth() {
    if (this._isMoving) return;
    this._isMoving = true;

    this.monthsScroller.style.transition = '';
    this.monthsScroller.style[MDWUtils.transformPropertyName] = `translateX(-200%)`;
    this.onChangeComplete(() => {
      const { month, year, day } = MDWDateUtil.getParts(MDWDateUtil.adjustDate(MDWDateUtil.parse(this.displayDate), { add: { month: 1 } }));
      // this event will cause a render
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: {
          year,
          month,
          day
        }
      }));
      this._isMoving = false;
    });
  }

  previousMonth() {
    if (this._isMoving) return;
    this._isMoving = true;

    this.monthsScroller.style.transition = '';
    this.monthsScroller.style[MDWUtils.transformPropertyName] = `translateX(0)`;
    this.onChangeComplete(() => {
      const { month, year, day } = MDWDateUtil.getParts(MDWDateUtil.adjustDate(MDWDateUtil.parse(this.displayDate), { add: { month: -1 } }));
      // this event will cause a render
      this.dispatchEvent(new CustomEvent('MDWDatePicker:monthChange', {
        composed: true,
        detail: {
          year,
          month,
          day
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

  toggleInput() {
    if (!this._isInput) {
      this._isInput = true;
      this.classList.add('mw-show-input');
      // for now the input textfield sits outside of this component because the css for textfield is not available
      // you can find the input in the index.js file for date-picker in _mobileTemplate()
      this.parentNode.classList.add('mw-show-input');
      this.parentNode.children[1].children[0].children[0].input.value = MDWDateUtil.format(MDWDateUtil.parse(this.displayDate), 'YYYY-MM-dd');
    } else {
      this._isInput = false;
      this.classList.remove('mw-show-input');
      this.parentNode.classList.remove('mw-show-input');
    }
  }

  template() {
    const displayDateObj = MDWDateUtil.parse(this.displayDate || MDWDateUtil.today());
    const prevDate = MDWDateUtil.adjustDate(displayDateObj, { add: { month: -1 } });
    const postDate = MDWDateUtil.adjustDate(displayDateObj, { add: { month: 1 } });
    const dates = [prevDate, displayDateObj, postDate];
    const selectedDate = this.selectedDate;
    const selectedDateFormatted = selectedDate ? MDWDateUtil.format(MDWDateUtil.parse(selectedDate), 'ddd, MMM DD') : 'Select date';
    
    return /*html*/`
      <div class="header">
        <div class="header-title">Select date</div>
        <div class="header-date-edit">
          <div class="header-date">${selectedDateFormatted}</div>
          <mdw-icon id="mdw-input-toggle">edit</mdw-icon>
        </div>
      </div>
      <div class="mdw-date-picker--views">
        <div class="mdw-date-picker--scroll-container" style="${MDWUtils.transformPropertyName}: translateX(-100%); transition: none;">
          ${dates.map((date, i) => /*html*/`
            <div class="single-month">
              <div class="mdw-date-picker--controls-container">
                <mdw-date-picker--year-view-button mdw-display-date="${date}"></mdw-date-picker--year-view-button>
                <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
              </div>
              <div class="mdw-date-picker--month-day-header">
                ${this.dayOfWeekNames.map(n => `<span>${n}</span>`).join('\n')}
              </div>
              <mdw-date-picker--month-days class="${i === 1 ? 'mdw-active-month' : ''}"
                mdw-fill-month
                mdw-display-date="${date}"
                mdw-selected-date="${this.selectedDate}"
                mdw-min-date="${this.minDate}"
                mdw-max-date="${this.maxDate}"
                ></mdw-date-picker--month-days>
            </div>
          `).join('\n')}
        </div>
      </div>
      <div class="bottom-controls">
        <mdw-button id="cancel-button" class="mdw-primary">cancel</mdw-button>
        <mdw-button id="ok-button" class="mdw-primary">ok</mdw-button>
      </div>
    `;
  }

  styles() {
    return /*css*/`
      :host {
        width: 328px;
      }
      .header {
        width: calc(100% - 48px);
        padding: 28px 24px 20px 24px;
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text-primary-on-background);
      }
      .header-title {
        font-size: 14px;
        padding-bottom: 32px;
      }
      .header-date {
        font-size: 36px;
      }
      .header-date-edit {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .mdw-date-picker--month-day-header {
        color: var(--mdw-theme-text--body);
        font-size: 12px;
        padding: 8px 16px;
        flex: 1;
        display: flex;
        justify-content: space-around;
      }
      .mdw-date-picker--views {
        display: flex;
        overflow: hidden;
        width: 100%;
      }
      .mdw-date-picker--scroll-container {
        display: flex;
        width: 100%;
        transition: transform 0.36s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      .mdw-date-picker--controls-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 4px;
        padding-top: 4px;
      }
      .single-month {
        width: 100%;
        flex-shrink: 0;
      }
      .bottom-controls {
        flex-direction: row;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px;
      }
      .mdw-date-picker-input {
        display: none;
        background-color: white;
        padding: 12px;
      }

      :host(.mw-show-input) .mdw-date-picker--views {
        display: none;
      }

      :host(.mw-show-input) .bottom-controls {
        display: none;
      }
    `;
  }
});

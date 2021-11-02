import BaseDatePickerElement from '../BaseDatePickerElement.js';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-year-view-desktop', class extends BaseDatePickerElement {
  constructor() {
    super();

    this.bound_onYearClick = this._onYearClick.bind(this);
    // TODO allow range to be set
    this.yearList = MDWDateUtil.yearRange({
      selectedDate: this.selectedDate || this.displayDate,
      minDate: this.minDate,
      maxDate: this.maxDate
    });
    this.cloneTemplate({ rerender: true });
  }

  get displayYearElement() {
    return this.shadowRoot.querySelector(`[mdw-year="${this.year}"]`);
  }

  get year() {
    if (this.selectedDate) return MDWDateUtil.getYear(this.selectedDate);
    return MDWDateUtil.getYear(this.displayDate);
  }

  addEvents() {
    this.shadowRoot.addEventListener('click', this.bound_onYearClick);
  }

  removeEvents() {
    this.shadowRoot.removeEventListener('click', this.bound_onYearClick);
  }

  afterRender() {
    this._scrollYearIntoView();
  }

  _updateDisplayDate() {
    this._scrollYearIntoView();
  }

  _updateSelectedDate() {
    this._scrollYearIntoView();
  }

  _updateMinDate() {
  }

  _updateMaxDate() {
  }

  _onYearClick({ target }) {
    if (!target.hasAttribute('mdw-year')) return;

    const year = parseInt(target.getAttribute('mdw-year'));
    const newDate = MDWDateUtil.adjustDate(new Date(this.selectedDate || this.displayDate), { set: { year } });
    this.dispatchEvent(new CustomEvent('MDWDatePicker:displayDateChange', {
      composed: true,
      detail: newDate
    }));
    this.dispatchEvent(new CustomEvent('MDWDatePicker:showMonthView', {
      composed: true
    }));
  }

  _scrollYearIntoView() {
    this.displayYearElement && this.displayYearElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  template() {
    const year = this.year;
    return /* html */`
      <div class="mdw-date-picker--year-list-grid">
        ${this.yearList.map(y => {
          let classes = 'mdw-date-picker--year-item';
          if (y.selected) classes += ' selected';
          if (y.beforeMinDate || y.afterMaxDate) classes += ' out-of-range';
          return /* html */`
            <div class="${classes}" mdw-year="${y.year}">${y.year}</div>
          `;
        }).join('\n')}
      </div>
    `;
  }

  styles() {
    return /* css */`
      :host {
        display: block;
        overflow-y: scroll;
        height: 214px;
      }
      .mdw-date-picker--year-list-grid {
        display: grid;
        grid-template-columns: repeat(4, 52px);
        grid-column-gap: 7px;
        grid-row-gap: 4px;
        align-items: center;
        justify-items: center;
        padding: 8px 16px;
        padding-right: 20px;
      }
      .mdw-date-picker--year-item {
        font-size: 15px;
        width: 100%;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
        cursor: pointer;
        color: var(--mdw-theme-text--heading);
      }
      .mdw-date-picker--year-item.selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text-primary-on-background);
      }

      .mdw-date-picker--year-item.out-of-range {
        color: rgb(140,120,120);
        pointer-events: none;
        cursor: auto;
      }
    `;
  }
});

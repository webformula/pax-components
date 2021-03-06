import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--year', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onYearClick = this.onYearClick.bind(this);

    // TODO allow range to be set
    this.yearList = MDWDateUtil.defaultYearRange();
    this.cloneTemplate({ rerender: true });
  }

  addEvents() {
    this.shadowRoot.querySelector('.mdw-date-picker--year-list-grid').addEventListener('click', this.bound_onYearClick);
  }

  removeEvents() {
    this.shadowRoot.querySelector('.mdw-date-picker--year-list-grid').removeEventListener('click', this.bound_onYearClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch (name) {
      case 'mdw-display-date':
        this._scrollYearIntoView();
        break;

      case 'mdw-selected-date':
        this._selectDate(newValue);
        break;

      case 'mdw-min-date':
        break;

      case 'mdw-max-date':
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
  }

  get selectedDate() {
    return this.getAttribute('mdw-selected-date');
  }

  get year() {
    return MDWDateUtil.getParts(MDWDateUtil.parse(this.displayDate)).year;
  }

  get displayYearElement() {
    return this.shadowRoot.querySelector(`[mdw-year="${this.year}"]`);
  }

  _scrollYearIntoView() {
    this.displayYearElement && this.displayYearElement.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  _selectDate(dateString) {
    const date = MDWDateUtil.parse(dateString);
    // TODO do i need to deselect on invalid dates?
    if (!MDWDateUtil.isValid(date)) return;
    this.deselect();

    const selectedElement = this.shadowRoot.querySelector(`[mdw-year="${MDWDateUtil.getYear(date)}"]`);
    if (selectedElement) selectedElement.classList.add('mdw-selected');
  }

  deselect() {
    const selected = this.shadowRoot.querySelector('.mdw-selected');
    if (selected) selected.classList.remove('mdw-selected');
  }

  onYearClick({ target }) {
    if (!target.hasAttribute('mdw-year')) return;

    const year = parseInt(target.getAttribute('mdw-year'));
    const newDate = MDWDateUtil.adjustDate(MDWDateUtil.parse(this.displayDate), { set: { year } });
    this.dispatchEvent(new CustomEvent('MDWDatePicker:yearChange', {
      composed: true,
      detail: { year }
    }));
  }


  template() {
    return /* html */`
      <div class="mdw-date-picker--year-list-grid">
        ${this.yearList.map(y => /* html */`
          <div class="mdw-date-picker--year-item" mdw-year="${y}">${y}</div>
        `).join('\n')}
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
      .mdw-date-picker--year-item.mdw-selected {
        background-color: var(--mdw-theme-primary);
        color: var(--mdw-theme-text-primary-on-background);
      }
    `;
  }
});

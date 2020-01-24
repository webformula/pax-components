import { HTMLElementExtended, html, css } from '@webformula/pax-core';
import MDWDateUtil from '../../../core/DateUtil.js';

customElements.define('mdw-date-picker--year', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onYearClick = this.onYearClick.bind(this);

    this.today = MDWDateUtil.today();
    // TODO allow range to be set
    this.yearList = MDWDateUtil.defaultYearRange();
    this.cloneTemplate(true);
  }

  addEvents() {
    this.shadowRoot.querySelector('.mdw-date-picker--year-list-grid').addEventListener('click', this.bound_onYearClick);
  }

  removeEvents() {
    this.shadowRoot.querySelector('.mdw-date-picker--year-list-grid').removeEventListener('click', this.bound_onYearClick);
  }

  static get observedAttributes() {
    return ['mdw-display-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        if (!newValue) return;

        this._scrollYearIntoView();
        break;
    }
  }

  get displayDate() {
    return this.getAttribute('mdw-display-date');
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

  // get year() {
  //   return this._selectedYear;
  // }
  //
  // get selectedElement() {
  //   let selected = this.shadowRoot.querySelector('.mdw-selected');
  //   if (!selected) selected = this.shadowRoot.querySelector(`[mdw-year="${this.today.getFullYear()}"]`);
  //   return selected;
  // }
  //
  // updateDisplay() {
  //   this.deslecet();
  //   const el = this.shadowRoot.querySelector(`[mdw-year="${this.year}"]`);
  //   if (el) el.classList.add('mdw-selected');
  // }
  //
  // deslecet() {
  //   const selected = this.shadowRoot.querySelector(`.mdw-selected`);
  //   if (selected) selected.classList.remove('mdw-selected');
  // }
  //
  // scrollToSelectedYear() {
  //   this.selectedElement.scrollIntoView({
  //     behavior: 'auto',
  //     block: 'center',
  //     inline: 'center'
  //   });
  // }
  //
  // click(event) {
  //   this.deslecet();
  //   event.target.classList.add('mdw-selected');
  //   this.dispatchEvent(new CustomEvent('MDWDatePicker:yearChange', {
  //     detail: {
  //       year: parseInt(event.target.getAttribute('mdw-year'))
  //     }
  //   }));
  // }'

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
    return html`
      <div class="mdw-date-picker--year-list-grid">
        ${this.yearList.map(y => html`
          <div class="mdw-date-picker--year-item" mdw-year="${y}">${y}</div>
        `).join('\n')}
      </div>
    `;
  }

  styles() {
    return css`
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
        color: var(--mdw-theme-text--on-primary);
      }
    `;
  }
});

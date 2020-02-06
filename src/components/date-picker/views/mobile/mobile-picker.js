import { HTMLElementExtended, html, css } from '@webformula/pax-core';
import MDWDateUtil from '../../../../core/DateUtil.js';

customElement.define('mdw-date-picker--mobile', class extends HTMLElementExtended {
  constructor() {
    super();
  }

  addEvents() {

  }

  removeEvents() {

  }

  static get observedAttributes() {
    return ['mdw-display-date', 'mdw-selected-date', 'mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-display-date':
        break;

      case 'mdw-selected-date':
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

  get minDate() {
    return this.getAttribute('mdw-min-date');
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date');
  }

  template() {
    const displayDateObj = MDWDateUtil.parse(this.displayDate);
    const prevDate = MDWDateUtil.adjustDate(displayDateObj, { add: { month: -1 } });
    const postDate = MDWDateUtil.adjustDate(displayDateObj, { add: { month: 1 } });
    const dates = [prevDate, displayDateObj, postDate];
    const selectedDateFormatted = this.selectedDate ? MDWDateUtil.format(MDWDateUtil.parse(this.selectedDate), 'ddd, MMM DD') : 'Select date';
    return html`
      <div class="mdw-date-picker--header">
        <div class="mdw-date-picker--header-title">Select date</div>

        <div mdw-row mdw-flex-position="center space-between">
          <div class="mdw-date-picker--header-date">${selectedDateFormatted}</div>
          <mdw-icon>edit</mdw-icon>
        </div>
      </div>

      <div class="mdw-date-picker--views">
        <div class="mdw-date-picker--scrolle-container" style="${MDWUtils.transformPropertyName}: translateX(-100%); transition: none;">
          ${dates.map(date => html`
            <div class="mdw-date-picker--controls-container">
              <mdw-date-picker--year-view-button mdw-display-date="${date}"></mdw-date-picker--year-view-button>
              <mdw-date-picker--month-navigation-buttons></mdw-date-picker--month-navigation-buttons>
            </div>
          `).join('\n')}
        </div.
      </div>
    `;
  }

  styles() {
    return css`
      .mdw-date-picker--views {
        display: flex;
        overflow: hidden;
        width: 100%;
      }

      .mdw-date-picker--scrolle-container {
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

      /* mdw-date-picker--view-month-single--mobile {
        width: 100%;
        flex-shrink: 0;
      } */
    `;
  }
});

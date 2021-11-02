import BaseDatePickerElement from '../BaseDatePickerElement.js';
import './month-view.js';
import './year-view.js';

customElements.define('mdw-date-picker--desktop', class extends BaseDatePickerElement {
  constructor() {
    super();
    this.bound_showYearView = this._showYearView.bind(this);
    this.bound_showMonthView = this._showMonthView.bind(this);
    this.cloneTemplate({ rerender: true });
  }

  addEvents() {
    this.addEventListener('MDWDatePicker:showYearView', this.bound_showYearView);
    this.addEventListener('MDWDatePicker:showMonthView', this.bound_showMonthView);
  }

  removeEvents() {
    this.removeEventListener('MDWDatePicker:showYearView', this.bound_showYearView);
    this.removeEventListener('MDWDatePicker:showMonthView', this.bound_showMonthView);
  }

  get currentElement() {
    let element;
    switch (this._currentView) {
      case 'month':
        element = this.shadowRoot.querySelector('mdw-month-view-desktop');
        break;

      case 'year':
        element = this.shadowRoot.querySelector('mdw-year-view-desktop');
        break;
    }
    return element;
  }

  _showYearView() {
    if (this._currentView === 'year') return;
    this.shadowRoot.querySelector('mdw-month-view-desktop').remove();
    this.shadowRoot.querySelector('render-block').innerHTML = this._yearTemplate();
  }

  _showMonthView() {
    if (this._currentView === 'month') return;
    this.shadowRoot.querySelector('mdw-year-view-desktop').remove();
    this.shadowRoot.querySelector('render-block').innerHTML = this._monthTemplate();
  }

  template() {
    return this._monthTemplate();
  }

  _monthTemplate() {
    this._currentView = 'month';

    return /*html*/`
      <mdw-month-view-desktop
        mdw-display-date="${this.getAttribute('mdw-display-date') || ''}"
        mdw-selected-date="${this.getAttribute('mdw-selected-date') || ''}"
        mdw-min-date="${this.getAttribute('mdw-min-date') || ''}"
        mdw-max-date="${this.getAttribute('mdw-max-date') || ''}"
      ></mdw-month-view-desktop>
    `;
  }

  _yearTemplate() {
    this._currentView = 'year';

    return /*html*/`
      <mdw-year-view-desktop
        mdw-display-date="${this.getAttribute('mdw-display-date') || ''}"
        mdw-selected-date="${this.getAttribute('mdw-selected-date') || ''}"
        mdw-min-date="${this.getAttribute('mdw-min-date') || ''}"
        mdw-max-date="${this.getAttribute('mdw-max-date') || ''}"
      ></mdw-year-view-desktop>
    `;
  }
});

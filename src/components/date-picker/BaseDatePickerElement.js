import { HTMLElementExtended } from '@webformula/pax-core';

export default class BaseDatePickerElement extends HTMLElementExtended {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      'mdw-display-date',
      'mdw-selected-date',
      'mdw-min-date',
      'mdw-max-date'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch (name) {
      case 'mdw-display-date':
        this._updateDisplayDate();
        this._currentDisplayDate = this.displayDate;
        break;

      case 'mdw-selected-date':
        this._updateSelectedDate();
        this._currentSelectedDate = this.selectedDate;
        break;

      case 'mdw-min-date':
        this._updateMinDate();
        break;

      case 'mdw-max-date':
        this._updateMaxDate();
        break;
    }
  }

  get currentElement() {
    throw Error('currentElement must be overridden');
  }

  get displayDate() {
    const mdwDisplayDate = this.getAttribute('mdw-display-date');
    if (!mdwDisplayDate) return new Date();
    return MDWDateUtil.parse(mdwDisplayDate);
  }

  get selectedDate() {
    const mdwSelectedDate = this.getAttribute('mdw-selected-date');
    if (!mdwSelectedDate) return;
    return MDWDateUtil.parse(mdwSelectedDate);
  }

  get minDate() {
    const mdwMinDate = this.getAttribute('mdw-min-date');
    if (!mdwMinDate) return;
    return MDWDateUtil.parse(mdwMinDate);
  }

  get maxDate() {
    const mdwMaxDate = this.getAttribute('mdw-max-date');
    if (!mdwMaxDate) return;
    return MDWDateUtil.parse(mdwMaxDate);
  }

  get currentDisplayDate() {
    if (!this._currentDisplayDate) this._currentDisplayDate = this.displayDate;
    return this._currentDisplayDate;
  }

  get currentSelectedDate() {
    if (!this._currentSelectedDate) this._currentSelectedDate = this.selectedDate;
    return this._currentSelectedDate;
  }

  _updateDisplayDate() {
    this.currentElement.setAttribute('mdw-display-date', this.getAttribute('mdw-display-date'));
  }

  _updateSelectedDate() {
    this.currentElement.setAttribute('mdw-selected-date', this.getAttribute('mdw-selected-date'));
  }

  _updateMinDate() {
    this.currentElement.setAttribute('mdw-min-date', this.getAttribute('mdw-min-date') || '');
  }

  _updateMaxDate() {
    this.currentElement.setAttribute('mdw-max-date', this.getAttribute('mdw-max-date') || '');
  }
}

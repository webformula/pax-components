import BaseDatePickerElement from '../BaseDatePickerElement.js';
import './input-view.js';
import './scroll-view.js';

customElements.define('mdw-date-picker--mobile', class extends BaseDatePickerElement {
  constructor() {
    super();
    
    this.bound_showScrollView = this._showScrollView.bind(this);
    this.bound_showInputView = this._showInputView.bind(this);
    this.cloneTemplate({ rerender: true });
  }

  addEvents() {
    this.addEventListener('MDWDatePicker:showYearView', this.bound_showScrollView);
    this.addEventListener('MDWDatePicker:showMonthView', this.bound_showInputView);
  }

  removeEvents() {
    this.removeEventListener('MDWDatePicker:showYearView', this.bound_showScrollView);
    this.removeEventListener('MDWDatePicker:showMonthView', this.bound_showInputView);
  }

  get currentElement() {
    let element;
    switch (this._currentView) {
      case 'scroll':
        element = this.shadowRoot.querySelector('mdw-scroll-view-mobile');
        break;

      case 'input':
        element = this.shadowRoot.querySelector('mdw-input-view-mobile');
        break;
    }
    return element;
  }

  _showScrollView() {
    if (this._currentView === 'scroll') return;
    this.shadowRoot.querySelector('mdw-input-view-mobile').remove();
    this.shadowRoot.querySelector('render-block').innerHTML = this._scrollTemplate();
  }

  _showInputView() {
    if (this._currentView === 'input') return;
    this.shadowRoot.querySelector('mdw-scroll-view-mobile').remove();
    this.shadowRoot.querySelector('render-block').innerHTML = this._inputTemplate();
  }

  template() {
    return this._scrollTemplate();
  }

  _scrollTemplate() {
    this._currentView = 'scroll';
    return /*html*/`
      <mdw-scroll-view-mobile
        mdw-display-date="${this.getAttribute('mdw-display-date') || ''}"
        mdw-selected-date="${this.getAttribute('mdw-selected-date') || ''}"
        mdw-min-date="${this.getAttribute('mdw-min-date') || ''}"
        mdw-max-date="${this.getAttribute('mdw-max-date') || ''}"
      ></mdw-scroll-view-mobile>
    `;
  }

  _inputTemplate() {
    this._currentView = 'input';
    return /*html*/`
      <mdw-input-view-mobile
        mdw-display-date="${this.getAttribute('mdw-display-date') || ''}"
        mdw-selected-date="${this.getAttribute('mdw-selected-date') || ''}"
        mdw-min-date="${this.getAttribute('mdw-min-date') || ''}"
        mdw-max-date="${this.getAttribute('mdw-max-date') || ''}"
      ></mdw-input-view-mobile>
    `;
  }
});

import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import MDWSurface from '../surface/service.js';
import MDWDateUtil from '../../core/DateUtil.js';
import './components/desktop-picker.js';
import './components/month-days.js';
import './components/year-view-button.js';
import './components/month-navigation-buttons.js';

// TODO update change (month, day year) events to be updateDate and selectDate

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_open = this.open.bind(this);
    this.bound_onInputChange = this._onInputChange.bind(this);
    this.bound_onMonthChange = this.onMonthChange.bind(this);

    this.displayDate = MDWDateUtil.parse(this.getAttribute('mdw-date') || MDWDateUtil.today());
    this.selectedDate = this.getAttribute('mdw-selected-date') || '';
  }

  async connectedCallback() {
    super.connectedCallback();

    this._attachToTriggerElement();

    this._panelSurface = await MDWSurface.create({
      component: 'panel',
      classes: 'mdw-date-picker-panel',
      template: MDWUtils.isMobile ? this._mobileTemplate() : this._desktopTemplate(),
      // TODO fix position setting
      // position: MDWUtils.isMobile ? 'center center' : 'inner-left bottom',
      animation: {
        type: 'scale',
        origin: 'top',
        opacity: true,
        target: this
      }
    });
  }

  disconnectedCallback() {
    if (this._panelSurface.element) {
      this._panelSurface.destroy();
    }
  }

  addEvents() {
    const pickerElement = this.pickerElement;
    if (!pickerElement) return;

    // this.pickerElement.addEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    pickerElement.addEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    // this.pickerElement.addEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    // this.pickerElement.addEventListener('MDWDatePicker:close', this.bound_close);
  }

  removeEvents() {
    const pickerElement = this.pickerElement;
    if (!pickerElement) return;

    // this.pickerElement.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    pickerElement.removeEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    // this.pickerElement.removeEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    // this.pickerElement.removeEventListener('MDWDatePicker:close', this.bound_close);
  }

  get pickerElement() {
    if (!this._panelSurface || !this._panelSurface.element) return null;

    const desktopElement = this._panelSurface.element.querySelector('mdw-date-picker--desktop')
    if (desktopElement) return desktopElement;

    // mobile
    const mobileElement = this._panelSurface.element.querySelector('mdw-date-picker--mobile')
    if (mobileElement) return mobileElement;
  }

  async open() {
    if (this._panelSurface.element && this._panelSurface.element.isOpen()) return;

    await this._panelSurface.open();
    // this._panelSurface.element.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (MDWUtils.isMobile) this._backdrop = MDWUtils.addBackdrop(this._panelSurface.element);
    MDWUtils.lockPageScroll();

    // add events after open because hte element does not exist until then
    this.addEvents();
  }

  updateDisplayDate({ year, month, day }) {
    this.displayDate = MDWDateUtil.buildFromParts({ year, month, day });
    this.pickerElement.setAttribute('mdw-display-date', this.displayDate);
  }

  onMonthChange({ detail }) {
    this.updateDisplayDate(detail);
  }


  // date-picker can be included inside its trigger element
  // date-picker can also be triggered directly by calling open
  _attachToTriggerElement() {
    const parent = this.parentNode;
    if (!parent) return;

    const isButton = parent.nodeName === 'MDW-BUTTON';
    if (isButton) {
      this._triggerElement = parent;
      this._triggerElement.addEventListener('click', this.bound_open);
      return;
    }

    const isTextField = parent.nodeName === 'MDW-TEXTFIELD';
    if (isTextField) {
      this._triggerElement = parent;
      this._triggerElement.addEventListener('click', this.bound_open);
      this._triggerElement.addEventListener('input', this.bound_onInputChange);
      // this._triggerElement.classList.add('mdw-hide-date-prompt');

      if (this._triggerElement.hasAttribute('min')) this.setAttribute('mdw-min-date', this._triggerElement.getAttribute('min'));
      if (this._triggerElement.hasAttribute('max')) this.setAttribute('mdw-max-date', this._triggerElement.getAttribute('max'));
    }
  }

  _desktopTemplate() {
    return /*html*/`
      <mdw-date-picker--desktop
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--desktop>
    `;
  }

  _mobileTemplate() {
    return /*html*/`
      <mdw-date-picker--mobile
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--mobile>
    `;
  }


  _onInputChange() {

  }
});

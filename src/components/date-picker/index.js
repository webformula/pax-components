import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../core/DateUtil.js';
import MDWUtils from '../../core/Utils.js';
import './views/desktop/desktop-picker.js';
import './views/mobile/mobile-picker.js';

// TODO update change (month, day year) events to be updateDate and selectDate

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onInputChange = this.onInputChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onYearChange = this.onYearChange.bind(this);
    this.bound_onMonthChange = this.onMonthChange.bind(this);
    this.bound_onDayChange = this.onDayChange.bind(this);
    this.bound_open = this.open.bind(this);
    this.bound_close = this.close.bind(this);

    this.displayDate = MDWDateUtil.parse(this.getAttribute('mdw-date') || MDWDateUtil.today());
    this.selectedDate = this.getAttribute('mdw-selected-date') || '';
    this.panelId = `mdw-date-picker_${MDWUtils.uid()}`;

    this._checkForTextField();
    this._buildPanel();
  }

  connectedCallback() {
    // this is need to ensure removeEvents() is called on connect
    super.connectedCallback();

    this._setupPanel();
  }

  disconnectedCallback() {
    // this is need to ensure removeEvents() is called on disconnect
    super.disconnectedCallback();

    if (this._attachedInput) {
      this._attachedInput.removeEventListener('click', this.bound_open);
      this._attachedInput.removeEventListener('input', this.bound_onInputChange);
    }

    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.remove();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  addEvents() {
    this.pickerElement.addEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    this.pickerElement.addEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.addEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    this.pickerElement.addEventListener('MDWDatePicker:close', this.bound_close);
  }

  removeEvents() {
    this.pickerElement.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    this.pickerElement.removeEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.removeEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    this.pickerElement.removeEventListener('MDWDatePicker:close', this.bound_close);
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get pickerElement() {
    if (!this.panel) return null;

    const desktopElement = this.panel.querySelector('mdw-date-picker--desktop');
    if (desktopElement) return desktopElement;

    // mobile
    const mobileElement = this.panel.querySelector('mdw-date-picker--mobile');
    if (mobileElement) return mobileElement;
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date') || '';
  }

  open() {
    if (this.panel._isOpen) return;

    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (MDWUtils.isMobile) this._backdrop = MDWUtils.addBackdrop(this.panel);
    MDWUtils.lockPageScroll();
  }

  close() {
    this.panel.close();
  }

  updateDisplayDate({ year, month, day }) {
    this.displayDate = MDWDateUtil.buildFromParts({ year, month, day });
    this.pickerElement.setAttribute('mdw-display-date', this.displayDate);
  }

  setDate(preventInputUpdate = false) {
    this.selectedDate = this.displayDate;
    this.pickerElement.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._attachedInput) {
      this._attachedInput.value = MDWDateUtil.format(this.selectedDate, 'YYYY-MM-dd');
    }
  }

  onInputChange(event) {
    const date = MDWDateUtil.parse(event.target.value);
    if (!MDWDateUtil.isValid(date)) return;

    this.updateDisplayDate(MDWDateUtil.getParts(date));
    this.setDate(true);
  }

  onYearChange({ detail }) {
    const dateParts = MDWDateUtil.getParts(MDWDateUtil.adjustDate(MDWDateUtil.parse(this.displayDate), { set: { year: detail.year} }));
    this.updateDisplayDate(dateParts);
  }

  onMonthChange({ detail }) {
    this.updateDisplayDate(detail);
  }

  onDayChange({ detail }) {
    this.updateDisplayDate(detail);
    this.setDate();
    if (!MDWUtils.isMobile) this.close();
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    MDWUtils.unlockPageScroll();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  _setupPanel() {
    const panelEl = this.panel;
    if (!panelEl.isReady) return;

    panelEl.hoistToBody();
    if (MDWUtils.isMobile) {
      panelEl.setClickOutsideClose(false);
      panelEl.fixPosition();
      panelEl.setTarget('body');
    } else {
      panelEl.setClickOutsideClose(true);
      this.panel.setTarget(this.getAttribute('mdw-target') || this.parentNode);

      if (this.panel._target.nodeName === 'MDW-TEXTFIELD' || this.panel._target.nodeName === 'input') {
        this.panel.setAttribute('mdw-position', 'inner-left bottom');
        if (this.panel._target.nodeName === 'MDW-TEXTFIELD') this.panel.ignoreElementOnClickToClose(this.panel._target.querySelector('input'));
      }
    }
  }

  _checkForTextField() {
    if (this.parentNode.nodeName === 'MDW-TEXTFIELD') {
      this._attachedInput = this.parentNode.querySelector('input');
      // TODO add down arrow to open
      this._attachedInput.addEventListener('click', this.bound_open);
      this._attachedInput.addEventListener('input', this.bound_onInputChange);
      this._attachedInput.classList.add('mdw-hide-date-prompt');

      if (this._attachedInput.hasAttribute('min')) this.setAttribute('mdw-min-date', this._attachedInput.getAttribute('min'));
      if (this._attachedInput.hasAttribute('max')) this.setAttribute('mdw-max-date', this._attachedInput.getAttribute('max'));
    }
  }

  _buildPanel() {
    const layout = MDWUtils.isMobile ? 'center center' : 'inner-left inner-top';
    const template = /* html */`
      <mdw-panel id="${this.panelId}" mdw-position="${layout}" class="mdw-date-picker--panel">
        ${!MDWUtils.isMobile ? this._desktopTemplate() : this._mobileTemplate()}
      </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
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
});

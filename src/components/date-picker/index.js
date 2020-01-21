import { HTMLElementExtended, html } from '@webformula/pax-core';
import MDWDateUtil from '../../core/DateUtil.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_onInputChange = this.onInputChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onMonthChange = this.onMonthChange.bind(this);
    this.bound_onDayChange = this.onDayChange.bind(this);
    this.bound_open = this.open.bind(this);

    this.displayDate = MDWDateUtil.parse(this.getAttribute('mdw-date') || MDWDateUtil.today());
    this.panelId = `mdw-date-picker_${MDWUtils.uid()}`;

    this._checkForTextField();
    this._buildPanel();
  }

  connectedCallback() {
    this._setupPanel();

    this.pickerElement.addEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.addEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
  }

  disconnectedCallback() {
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

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get pickerElement() {
    if (!this.panel) return null;

    const desktopElement = this.panel.querySelector('mdw-date-picker--desktop');
    if (desktopElement) return desktopElement;

    // mobile
    // return this.panel.querySelector('mdw-date-picker--desktop');
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
    const template = html`
      <mdw-panel id="${this.panelId}" mdw-position="${layout}" class="mdw-date-picker--panel">
        <mdw-date-picker--desktop
          mdw-display-date="${this.displayDate}"
          mdw-selected-date="${this.selectedDate}"
          mdw-min-date="${this.minDate}"
          mdw-max-date="${this.maxDate}"
        ></mdw-date-picker--desktop>
      </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', template);
  }
});

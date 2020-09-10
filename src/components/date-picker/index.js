import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import MDWSurface from '../surface/service.js';
import MDWDateUtil from '../../core/DateUtil.js';
import './components/desktop-picker.js';
import './components/mobile-picker.js';
import './components/month-days.js';
import './components/year-view-button.js';
import './components/month-navigation-buttons.js';
import './components/years.js';

// TODO update change (month, day year) events to be updateDate and selectDate

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this.bound_open = this.open.bind(this);
    this.bound_close = this.close.bind(this);
    this.bound_onInputChange = this._onInputChange.bind(this);
    this.bound_onMonthChange = this.onMonthChange.bind(this);
    this.bound_onYearChange = this.onYearChange.bind(this);
    this.bound_onDayChange = this.onDayChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);

    this.displayDate = MDWDateUtil.parse(this.getAttribute('mdw-date') || MDWDateUtil.today());
    this.selectedDate = this.getAttribute('mdw-selected-date') || '';

    MDWSurface.create({
      component: 'panel',
      classes: 'mdw-date-picker-panel',
      template: MDWUtils.isMobile ? this._mobileTemplate() : this._desktopTemplate(),
      position: MDWUtils.isMobile ? 'center center' : undefined,
      scrollPanelWidthPage: true,
      animation: {
        type: 'scale',
        origin: 'top',
        opacity: true,
        target: this
      }
    }).then(element => {
      this._panelSurface = element;
    });
  }

  async connectedCallback() {
    super.connectedCallback();
    this._attachToTriggerElement();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._isTextField) {
      this._triggerElement.removeEventListener('click', this.bound_open);
      this._triggerElement.removeEventListener('input', this.bound_onInputChange);
    }

    if (this._panelSurface.element) {
      this._panelSurface.destroy();
    }

    this.removeBackdrop();
  }

  addEvents() {
    const pickerElement = this.pickerElement;
    if (!pickerElement) return;

    this.pickerElement.addEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    pickerElement.addEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.addEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    this.pickerElement.addEventListener('MDWDatePicker:close', this.bound_close);
  }

  removeEvents() {
    const pickerElement = this.pickerElement;
    if (!pickerElement) return;

    this.pickerElement.removeEventListener('MDWDatePicker:yearChange', this.bound_onYearChange);
    pickerElement.removeEventListener('MDWDatePicker:monthChange', this.bound_onMonthChange);
    this.pickerElement.removeEventListener('MDWDatePicker:dayChange', this.bound_onDayChange);
    this.pickerElement.removeEventListener('MDWDatePicker:close', this.bound_close);
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
    this._panelSurface.element.clickBodyToClose();
    this._panelSurface.element.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (MDWUtils.isMobile) this._backdrop = MDWUtils.addBackdrop(this._panelSurface.element);

    // add events after open because hte element does not exist until then
    this.addEvents();

    // set date from textfield
    if (this._isTextField) {
      const value = this._triggerElement.input.value;
      if (MDWDateUtil.isValid(new Date(value))) {
        this.updateDisplayDate(MDWDateUtil.getParts(MDWDateUtil.parse(value)));
        this.setDate(true);
        this.setInitialValues();
      }
    }
  }

  close() {
    if (this._panelSurface.element) {
      this._panelSurface.element.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
      this._panelSurface.element.close();
    }
    this.removeBackdrop();
  }

  onPanelClose() {
    this.removeBackdrop();
  }

  removeBackdrop() {
    if (!this._backdrop) return;
    this._backdrop.remove();
    this._backdrop = undefined;
  }

  updateDisplayDate({ year, month, day }) {
    this.displayDate = MDWDateUtil.buildFromParts({ year, month, day });
    this.pickerElement.setAttribute('mdw-display-date', this.displayDate);
  }

  setDate(preventInputUpdate = false) {
    this.selectedDate = this.displayDate;
    this.pickerElement.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._isTextField) {
      this._triggerElement.input.value = MDWDateUtil.format(this.selectedDate, 'YYYY-MM-dd');
    }
  }

  setInitialValues() {
    this.pickerElement.setAttribute('mdw-initial-date', this.selectedDate);
  }

  onMonthChange({ detail }) {
    this.updateDisplayDate(detail);
  }

  onYearChange({ detail }) {
    const dateParts = MDWDateUtil.getParts(MDWDateUtil.adjustDate(MDWDateUtil.parse(this.displayDate), { set: { year: detail.year } }));
    this.updateDisplayDate(dateParts);
  }

  onDayChange({ detail }) {
    this.updateDisplayDate(detail);
    this.setDate();
    if (!MDWUtils.isMobile) this.close();
  }


  // date-picker can be included inside its trigger element
  // date-picker can also be triggered directly by calling open
  _attachToTriggerElement() {
    const parent = this.parentNode;
    if (!parent) return;

    this._isButton = parent.nodeName === 'MDW-BUTTON';
    if (this._isButton) {
      this._triggerElement = parent;
      this._triggerElement.addEventListener('click', this.bound_open);
      return;
    }

    this._isTextField = parent.nodeName === 'MDW-TEXTFIELD';
    if (this._isTextField) {
      this._triggerElement = parent;
      this._triggerElement.classList.add('mdw-has-date-picker');
      this._triggerElement.addEventListener('click', this.bound_open);
      this._triggerElement.addEventListener('input', this.bound_onInputChange);

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
        
      <div class="mdw-date-picker-input mdw-column">
        <div style="padding-left: 44px; padding-right: 44px; padding-top: 24px">
          <mdw-textfield>
            <mdw-icon>enter date</mdw-icon>
            <input type="date" oninput="this.parentNode.parentNode.parentNode.parentNode.children[0].setDateFromInput(this.value)">
            <label>Date</label>
          </mdw-textfield>
        </div>

        <div class="bottom-controls" style="flex-direction: row; display: flex; justify-content: flex-end; align-items: center; padding: 8px;">
          <mdw-button id="cancel-button" class="mdw-primary" onclick="this.parentNode.parentNode.parentNode.children[0].onCancel()">cancel</mdw-button>
          <mdw-button id="ok-button" class="mdw-primary" onclick="this.parentNode.parentNode.parentNode.children[0].onOk()">ok</mdw-button>
        </div>
      </div>
    `;
  }


  _onInputChange(event) {
    const date = MDWDateUtil.parse(event.target.value);
    if (!MDWDateUtil.isValid(date)) return;

    this.updateDisplayDate(MDWDateUtil.getParts(date));
    this.setDate(true);
  }
});

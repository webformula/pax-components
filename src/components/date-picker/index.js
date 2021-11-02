import BaseDatePickerElement from './BaseDatePickerElement.js';
import MDWUtils from '../../core/Utils.js';
import MDWSurface from '../surface/service.js';
import MDWDateUtil from '../../core/DateUtil.js';
import './desktop/date-picker.js';
import './mobile/date-picker.js';

customElements.define('mdw-date-picker', class extends BaseDatePickerElement {
  constructor() {
    super();

    this.bound_open = this.open.bind(this);
    this.bound_onInputChange = this._onInputChange.bind(this);
    this.bound_onUpdateDisplayDate = this._onUpdateDisplayDate.bind(this);
    this.bound_onUpdateSelectedDate = this._onUpdateSelectedDate.bind(this);

    MDWSurface.create({
      component: 'panel',
      classes: 'mdw-date-picker-panel',
      template: this._desktopTemplate(),
      template: this._mobileTemplate(),
      position: MDWUtils.isMobile ? 'center center' : 'inner-left bottom',
      position: 'center center',
      scrollPanelWidthPage: true,
      anchorElement: this,
      animation: {
        type: 'scale',
        origin: 'top left',
        opacity: true
      }
    }).then(element => {
      this._panelSurface = element;
    });
  }

  get currentPickerElement() {
    // return this._panelSurface.element.querySelector('mdw-date-picker--desktop');
    return this._panelSurface.element.querySelector('mdw-date-picker--mobile');
  }

  get isOpen() {
    return this._panelSurface.element && this._panelSurface.element.isOpen();
  }

  async connectedCallback() {
    // having to many problems with the mobile version of the date picker. For now we will forgo it and use native controls
    // if (MDWUtils.isMobile) return;

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

    // this.removeBackdrop();
  }

  async open() {
    if (this.isOpen) return;

    await this._panelSurface.open();
    this._panelSurface.element.clickBodyToClose();
    // this._panelSurface.element.addEventListener('MDWPanel:closed', this.bound_close);
    // if (MDWUtils.isMobile) this._backdrop = MDWUtils.addBackdrop(this._panelSurface.element);

    this._updateSelectedDate();
    this._updateDisplayDate();
    this.currentPickerElement.addEventListener('MDWDatePicker:displayDateChange', this.bound_onUpdateDisplayDate);
    this.currentPickerElement.addEventListener('MDWDatePicker:dateSelected', this.bound_onUpdateSelectedDate);
  }

  _onInputChange(event) {
    const date = MDWDateUtil.parse(event.target.value);
    if (!MDWDateUtil.isValid(date)) return;

    // TODO fix this or turn it into input invalidation
    if ((this.minDate || this.maxDate) && !MDWDateUtil.inRange(date, this.minDate, this.maxDate)) {
      console.warn('Date is out of range');
      if (this.currentSelectedDate) this.setAttribute('mdw-selected-date', MDWDateUtil.format(this.currentSelectedDate, 'YYYY-MM-DD'));
      else if (Math.abs(date - this.minDate) <= Math.abs(date - this.maxDate)) this.setAttribute('mdw-selected-date', MDWDateUtil.format(this.minDate, 'YYYY-MM-DD'));
      else this.setAttribute('mdw-selected-date', MDWDateUtil.format(this.maxDate, 'YYYY-MM-DD'));
      return;
    }

    const newDateAttribute = MDWDateUtil.format(date, 'YYYY-MM-DD');
    this.setAttribute('mdw-selected-date', newDateAttribute);
    this.setAttribute('mdw-display-date', newDateAttribute);
  }

  _onUpdateDisplayDate(event) {
    const date = event.detail ? event.detail : new Date();
    this.setAttribute('mdw-display-date', MDWDateUtil.format(date, 'YYYY-MM-DD'));
  }

  _updateDisplayDate() {
    if (!this.isOpen) return;
    this.currentPickerElement.setAttribute('mdw-display-date', this.getAttribute('mdw-display-date') || '');
  }

  _onUpdateSelectedDate(event) {
    const date = event.detail ? event.detail : new Date();
    this.setAttribute('mdw-selected-date', MDWDateUtil.format(date, 'YYYY-MM-DD'));
  }

  _updateSelectedDate() {
    if (!this.isOpen) return;

    this.currentPickerElement.setAttribute('mdw-selected-date', this.getAttribute('mdw-selected-date') || '');
    this._setInputDate();
  }

  _setInputDate() {
    if (!this._isTextField) return;
    this._triggerElement.input.value = MDWDateUtil.format(MDWDateUtil.parse(this.getAttribute('mdw-selected-date')), 'YYYY-MM-dd');
  }

  _updateMinDate() {
    if (!this.isOpen) return;
    this.currentPickerElement.setAttribute('mdw-min-date', this.getAttribute('mdw-min-date') || '');
  }

  _updateMaxDate() {
    if (!this.isOpen) return;
    this.currentPickerElement.setAttribute('mdw-max-date', this.getAttribute('mdw-max-date') || '');
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
      // if (!MDWUtils.isMobile) {
        this._triggerElement.addEventListener('click', this.bound_open);
        this._triggerElement.addEventListener('input', this.bound_onInputChange);
      // } else {
      //   this._triggerElement.addEventListener('click', this.bound_open);
      //   this._triggerElement.addEventListener('input', this.bound_onInputChange);
      // }

      // if (this._triggerElement.hasAttribute('min')) this.setAttribute('mdw-min-date', this._triggerElement.getAttribute('min'));
      // if (this._triggerElement.hasAttribute('max')) this.setAttribute('mdw-max-date', this._triggerElement.getAttribute('max'));
    }
  }


  _desktopTemplate() {
    return /*html*/`
      <mdw-date-picker--desktop
        mdw-display-date="${this.getAttribute('mdw-display-date') || ''}"
        mdw-selected-date="${this.getAttribute('mdw-selected-date') || ''}"
      ></mdw-date-picker--desktop>
      `;
  }

  _mobileTemplate() {
    return /*html*/`
      <mdw-date-picker--mobile
        mdw-display-date="${this.getAttribute('mdw-display-date') || ''}"
        mdw-selected-date="${this.getAttribute('mdw-selected-date') || ''}"
      ></mdw-date-picker--mobile>
      `;
  }
});

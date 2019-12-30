import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../core/DateUtil.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-date-picker', class extends HTMLElementExtended {
  constructor() {
    super();

    this._currentView = 'month';
    // this.selectedYear = MDWDateUtil.currentYear();
    // this.selectedMonth = MDWDateUtil.currentMonth();
    // this.selectedDay = MDWDateUtil.currentDay();
    // this.selectedDate = MDWDateUtil.buildFromParts({
    //   year: this.selectedYear,
    //   month: this.selectedMonth,
    //   day: this.selectedDay
    // });

    this.panelId = `mdw-date-picker_${MDWUtils.uid()}`;
    this.buildPanel_();

    this.bound_yearClick = this.yearClick.bind(this)
    this.bound_monthChange = this.monthChange.bind(this);
    this.bound_yearChange = this.yearChange.bind(this);
    this.bound_dayChange = this.dayChange.bind(this);
    this.bound_open = this.open.bind(this);
    this.bound_onCancel = this.onCancel.bind(this);
    this.bound_onOk = this.onOk.bind(this);
    this.bound_inputChange = this.inputChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);

    this.checkForTextField();
  }

  connectedCallback() {
    this.panel.setTarget(this.getAttribute('mdw-target') || this.parentNode);
    if (this.panel._target.nodeName === 'MDW-TEXTFIELD' || this.panel._target.nodeName === 'input') {
      this.panel.setAttribute('mdw-position', 'inner-left bottom');
      if (this.panel._target.nodeName === 'MDW-TEXTFIELD') this.panel.ignoreElementOnClickToClose(this.panel._target.querySelector('input'));
    }
    this.panel.querySelector('.mdw-date-picker--body-year-view-button').addEventListener('click', this.bound_yearClick);
    if (this.cancelButton) this.cancelButton.addEventListener('click', this.bound_onCancel);
    if (this.okButton) this.okButton.addEventListener('click', this.bound_onOk);
    this.changeView('month');
  }

  disconnectedCallback() {
    if (this._attachedInput) {
      this._attachedInput.removeEventListener('click', this.bound_open);
      this._attachedInput.removeEventListener('input', this.bound_inputChange);
    }
    this.panel.querySelector('.mdw-date-picker--body-year-view-button').removeEventListener('click', this.bound_yearClick);
    if (this.cancelButton) this.cancelButton.removeEventListener('click', this.bound_onCancel);
    if (this.okButton) this.okButton.removeEventListener('click', this.bound_onOk);
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.panel.remove();
  }

  get panel() {
    return document.querySelector(`#${this.panelId}`);
  }

  get viewContainer() {
    return this.panel && this.panel.querySelector('.mdw-date-picker--body-views');
  }

  get cancelButton() {
    return this.panel.querySelector('#cancel-button');
  }

  get okButton() {
    return this.panel.querySelector('#ok-button');
  }

  get yearComponent() {
    return this.viewContainer && this.viewContainer.querySelector('mdw-date-picker--view-year');
  }

  get monthComponent() {
    return this.viewContainer && this.viewContainer.querySelector('mdw-date-picker--view-month');
  }


  setDate(dateParts) {
    if (dateParts.day !== undefined) this.selectedDay = dateParts.day;
    if (dateParts.month !== undefined) this.selectedMonth = dateParts.month;
    if (dateParts.year !== undefined) this.selectedYear = dateParts.year;
    if (dateParts.updateDate) this.updateDate();
    this.setYearSelector({ year: this.selectedYear, month: this.selectedMonth });
  }

  setYearSelector(dateParts) {
    this.panel.querySelector('#month-year-dropdown').innerHTML = MDWDateUtil.format(MDWDateUtil.buildFromParts(dateParts), 'MMMM YYYY');
  }

  checkForTextField() {
    if (this.parentNode.nodeName === 'MDW-TEXTFIELD') {
      this._attachedInput = this.parentNode.querySelector('input');
      // TODO add down arrow to open
      this._attachedInput.addEventListener('click', this.bound_open);
      this._attachedInput.addEventListener('input', this.bound_inputChange);
      this._attachedInput.classList.add('mdw-hide-date-prompt');
    }
  }

  inputChange(event) {
    const value = event.target.value.split('-');
    const day = parseInt(value.pop());
    const month = parseInt(value.pop() - 1);
    const year = parseInt(value.pop());
    this.setDate({
      year,
      month,
      day
    });
    this.updateDate(true);
  }

  onCancel() {
    if (this._openingDay) {
      this.selectedDay = this._openingDay;
      this.selectedMonth = this._openingMonth;
      this.selectedYear = this._openingYear;
      this.updateDate();
    }
    this.close();
  }

  onOk() {
    this.close();
  }

  updateDate(preventInputUpdate = false) {
    if (!this.selectedYear || !this.selectedMonth || !this.selectedDay) {
      if (this.monthComponent) this.monthComponent.scrollToCurrentMonth();
      return;
    }

    this.selectedDate = MDWDateUtil.buildFromParts({
      year: this.selectedYear,
      month: this.selectedMonth,
      day: this.selectedDay
    });

    // update this components displays
    if (this.panel && this.panel.querySelector) {
      if (MDWUtils.isMobile) this.panel.querySelector('.mdw-date-picker--header-date').innerHTML = MDWDateUtil.format(this.selectedDate, 'ddd, MMM DD');
      this.panel.querySelector('#month-year-dropdown').innerHTML = MDWDateUtil.format(this.selectedDate, 'MMMM YYYY');
    }

    // update views{
    if (this.monthComponent) this.monthComponent.updateDisplay(this.selectedDate);
    if (this.yearComponent) this.yearComponent.updateDisplay(this.selectedDate);

    // update input
    if (this._attachedInput && !preventInputUpdate) {
      this._attachedInput.value = MDWDateUtil.format(this.selectedDate, 'YYYY-MM-dd');
    }
  }

  yearClick() {
    this.changeView('year');
  }

  changeView(value) {
    switch(value) {
      case 'year':
        this._currentView = 'year';
        this.attachYearView();
        break;
      case 'month':
        this._currentView = 'month';
        this.attachMonthView();
        break;
    }
  }

  open() {
    if (this.panel._isOpen) return;
    this._openingDay = this.selectedDay;
    this._openingMonth = this.selectedMonth;
    this._openingYear = this.selectedYear;
    this.panel.style[`${MDWUtils.transformPropertyName}`] = 'scale(0.9)';
    this.panel.style[`${MDWUtils.transformPropertyName}-origin`] = 'top left';
    this.panel.open(true);
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    MDWUtils.lockPageScroll();

    this.updateDate(true);
  }

  close() {
    this.panel.close();
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    MDWUtils.unlockPageScroll();
  }

  yearChange({ detail }) {
    this.setDate(detail);

    // prevent click from falling through when element is removed and casing the panel to close
    setTimeout(() => {
      this.changeView('month');
    }, 0);
  }

  monthChange({ detail }) {
    this.setDate(detail);
  }

  dayChange({ detail }) {
    this.setDate(detail);
    this.updateDate();
    if (!MDWDateUtil.isMobile) this.close();
  }

  buildPanel_() {
    const panelHTML = `
    <mdw-panel id="${this.panelId}" mdw-position="inner-left inner-top" mdw-flex-position="center center" class="mdw-date-picker-panel">
      <div class="mdw-date-picker--container" style="width: 320px">
        ${!MDWUtils.isMobile ? '' : `
          <div class="mdw-date-picker--header">
            <div class="mdw-date-picker--header-title">Select date</div>

            <div mdw-row mdw-flex-position="center space-between">
              <!-- Mon, Nov 17 -->
              <div class="mdw-date-picker--header-date">${MDWDateUtil.format(this.selectedDate, 'ddd, MMM DD')}</div>
              <mdw-icon>edit</mdw-icon>
            </div>
          </div>
        `}

        <div class="mdw-date-picker--body">
          <div mdw-row mdw-flex-position="center space-between">
            <div mdw-row mdw-flex-position="start space-around" class="mdw-date-picker--body-year-view-button">
              <div id="month-year-dropdown">${MDWDateUtil.format(this.selectedDate, 'MMMM YYYY')}</div>
              <i class="mdw-select__icon"></i>
            </div>
          </div>

          <!-- year, month, day, schedule? -->
          <div mdw-column class="mdw-date-picker--body-views" style="min-height: 280px;">
            ${
              this._currentView === 'month'
              ? `<mdw-date-picker--view-month mdw-selected-date="${this.selectedDate}"></mdw-date-picker--view-month>`
              : `<mdw-date-picker--view-year mdw-selected-date="${this.selectedDate}"></mdw-date-picker--view-year>`
            }
          </div>

          ${!MDWUtils.isMobile ? '' : `
            <div mdw-row mdw-flex-position="center right" style="padding: 8px;">
              <mdw-button id="cancel-button" class="mdw-primary">cancel</mdw-button>
              <mdw-button id="ok-button" class="mdw-primary">ok</mdw-button>
            </div>
          `}
        </div>
      </div>
    </mdw-panel>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHTML);
    const panelEl = this.panel;
    if (panelEl.hoistToBody) panelEl.hoistToBody(this);
  }

  attachYearView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-year mdw-date="${this.selectedDate ? this.selectedDate : ''}"></mdw-date-picker--view-year>`;
    const yearEl = this.yearComponent;
    yearEl.addEventListener('MDWDatePicker:yearChange', this.bound_yearChange);
    yearEl.datePickerComponenet = this;

    const monthEl = this.monthComponent;
    if (monthEl) {
      monthEl.removeEventListener('MDWDatePicker:dayChange', this.bound_dayChange);
      monthEl.removeEventListener('MDWDatePicker:monthChange', this.bound_monthChange);
    }
  }

  attachMonthView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-month mdw-date="${this.selectedDate ? this.selectedDate : ''}"></mdw-date-picker--view-month>`;
    const monthEl = this.monthComponent;
    monthEl.addEventListener('MDWDatePicker:dayChange', this.bound_dayChange);
    monthEl.addEventListener('MDWDatePicker:monthChange', this.bound_monthChange);
    monthEl.datePickerComponenet = this;

    const yearEl = this.yearComponent;
    if (yearEl) yearEl.removeEventListener('MDWDatePicker:yearChange', this.bound_yearChange);
  }
});

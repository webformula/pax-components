import { HTMLElementExtended } from '@webformula/pax-core';
import MDWDateUtil from '../../core/DateUtil.js';
import MDWUtils from '../../core/Utils.js';

customElements.define('mdw-date-picker--old', class extends HTMLElementExtended {
  constructor() {
    super();

    this._currentView = 'month';
    this.panelId = `mdw-date-picker_${MDWUtils.uid()}`;
    this.displayDate = MDWDateUtil.parse(this.getAttribute('mdw-date') || MDWDateUtil.today());

    this.bound_monthChange = this.monthChange.bind(this);
    this.bound_yearChange = this.yearChange.bind(this);
    this.bound_dayChange = this.dayChange.bind(this);
    this.bound_open = this.open.bind(this);
    this.bound_onCancel = this.onCancel.bind(this);
    this.bound_onOk = this.onOk.bind(this);
    this.bound_inputChange = this.inputChange.bind(this);
    this.bound_onPanelClose = this.onPanelClose.bind(this);
    this.bound_onShowYearView = () => setTimeout(() => this.changeView('year'), 0);

    this._checkForTextField();
    this._buildPanel();
  }

  static get observedAttributes() {
    return ['mdw-min-date', 'mdw-max-date'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue || newValue === oldValue) return;

    switch(name) {
      case 'mdw-min-date':
        this.currentComponent.setAttribute('mdw-min-date', newValue);
        break;

      case 'mdw-max-date':
        this.currentComponent.setAttribute('mdw-max-date', newValue);
        break;
    }
  }

  connectedCallback() {
    this._setupPanel();
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

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
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

  get currentComponent() {
    return this.monthComponent || this.yearComponent
  }

  get minDate() {
    return this.getAttribute('mdw-min-date') || '';
  }

  get maxDate() {
    return this.getAttribute('mdw-max-date') || '';
  }


  _checkForTextField() {
    if (this.parentNode.nodeName === 'MDW-TEXTFIELD') {
      this._attachedInput = this.parentNode.querySelector('input');
      // TODO add down arrow to open
      this._attachedInput.addEventListener('click', this.bound_open);
      this._attachedInput.addEventListener('input', this.bound_inputChange);
      this._attachedInput.classList.add('mdw-hide-date-prompt');

      if (this._attachedInput.hasAttribute('min')) this.setAttribute('mdw-min-date', this._attachedInput.getAttribute('min'));
      if (this._attachedInput.hasAttribute('max')) this.setAttribute('mdw-max-date', this._attachedInput.getAttribute('max'));
    }
  }

  updateDisplayDate(dateParts) {
    this.displayDate = MDWDateUtil.buildFromParts(dateParts);
    this.updateDisplay();
  }

  updateDisplay() {
    // update views
    const monthEl = this.monthComponent;
    if (monthEl) monthEl.setAttribute('mdw-display-date', this.displayDate);
    const yearEl = this.yearComponent;
    if (yearEl) yearEl.setAttribute('mdw-year', this.displayDate.getFullYear);
  }

  setDate(preventInputUpdate = false) {
    this.selectedDate = this.displayDate;

    // update this components displays
    if (MDWUtils.isMobile) this.panel.querySelector('.mdw-date-picker--header-date').innerHTML = MDWDateUtil.format(this.selectedDate, 'ddd, MMM DD');

    // update views
    const monthEl = this.monthComponent;
    if (monthEl) monthEl.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._attachedInput) {
      this._attachedInput.value = MDWDateUtil.format(this.selectedDate, 'YYYY-MM-dd');
    }
  }

  unsetDate(preventInputUpdate = false) {
    this.selectedDate = undefined;

    // update views
    const monthEl = this.monthComponent;
    if (monthEl) monthEl.setAttribute('mdw-selected-date', this.selectedDate);

    if (!preventInputUpdate && this._attachedInput) {
      this._attachedInput.value = '';
    }
  }

  inputChange(event) {
    const value = event.target.value.split('-');
    const day = parseInt(value.pop());
    const month = parseInt(value.pop() - 1);
    const year = parseInt(value.pop());
    this.updateDisplayDate({
      year,
      month,
      day
    });
    this.setDate(true);
  }

  onCancel() {
    // revet date back
    if (this._openingDate) {
      this.updateDisplayDate({
        year: this._openingDate.getFullYear(),
        month: this._openingDate.getMonth(),
        day: this._openingDate.getDate()
      });
      this.setDate();

    // unset date
    } else {
      this.displayDate = MDWDateUtil.today();
      this.updateDisplay();
      this.unsetDate();
    }
    this.close();
  }

  onOk() {
    this.close();
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
    this._openingDate = this.selectedDate;

    this.displayDate = this.selectedDate || MDWDateUtil.today();
    this.updateDisplay();

    this.panel.open();
    this.panel.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
    if (MDWUtils.isMobile) this._backdrop = MDWUtils.addBackdrop(this.panel);
    MDWUtils.lockPageScroll();
  }

  close() {
    this.panel.close();
  }

  onPanelClose() {
    this.panel.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    MDWUtils.unlockPageScroll();

    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = undefined;
    }
  }

  yearChange({ detail }) {
    this.updateDisplayDate(detail);

    // prevent click from falling through when element is removed and casing the panel to close
    setTimeout(() => {
      this.changeView('month');
    }, 0);
  }

  monthChange({ detail }) {
    this.updateDisplayDate(detail);
  }

  dayChange({ detail }) {
    this.updateDisplayDate(detail);
    this.setDate();
    if (!MDWUtils.isMobile) this.close();
  }

  _buildPanel() {
    const layout = MDWUtils.isMobile ? 'center center' : 'inner-left inner-top';
    const panelHTML = `
    <mdw-panel id="${this.panelId}" mdw-position="${layout}" mdw-flex-position="center center" class="mdw-date-picker-panel">
      <div class="mdw-date-picker--container ${MDWUtils.isMobile ? 'mdw-mobile' : ''}">
        ${!MDWUtils.isMobile ? '' : `
          <div class="mdw-date-picker--header">
            <div class="mdw-date-picker--header-title">Select date</div>

            <div mdw-row mdw-flex-position="center space-between">
              <div class="mdw-date-picker--header-date">${this.selectedDate ? MDWDateUtil.format(this.selectedDate, 'ddd, MMM DD') : 'Select date'}</div>
              <mdw-icon>edit</mdw-icon>
            </div>
          </div>
        `}

        <div class="mdw-date-picker--body">
          <!-- year, month, day, schedule? -->
          <div mdw-column class="mdw-date-picker--body-views">
            ${
              this._currentView === 'month'
              ? `<mdw-date-picker--view-month
                  mdw-display-date="${this.displayDate}"
                  mdw-selected-date="${this.selectedDate}"
                  mdw-min-date="${this.minDate}"
                  mdw-max-date="${this.maxDate}"
                  ></mdw-date-picker--view-month>`
              : `<mdw-date-picker--view-year
                  mdw-year="${this.displayDate.getFullYear()}"
                  mdw-min-date="${this.minDate}"
                  mdw-max-date="${this.maxDate}"
                  ></mdw-date-picker--view-year>`
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
    this._setupPanel();
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

  attachYearView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-year mdw-year="${this.displayDate.getFullYear()}"></mdw-date-picker--view-year>`;
    const yearEl = this.yearComponent;
    yearEl.addEventListener('MDWDatePicker:yearChange', this.bound_yearChange);

    const monthEl = this.monthComponent;
    if (monthEl) {
      monthEl.removeEventListener('MDWDatePicker:dayChange', this.bound_dayChange);
      monthEl.removeEventListener('MDWDatePicker:monthChange', this.bound_monthChange);
      monthEl.removeEventListener('MDWDatePicker:showYearView', this.bound_onShowYearView);
    }
  }

  attachMonthView() {
    this.viewContainer.innerHTML = `<mdw-date-picker--view-month
                                      mdw-display-date="${this.displayDate}"
                                      mdw-selected-date="${this.selectedDate}"
                                      mdw-min-date="${this.minDate}"
                                      mdw-max-date="${this.maxDate}"
                                      ></mdw-date-picker--view-month>`;
    const monthEl = this.monthComponent;
    monthEl.addEventListener('MDWDatePicker:dayChange', this.bound_dayChange);
    monthEl.addEventListener('MDWDatePicker:monthChange', this.bound_monthChange);
    monthEl.addEventListener('MDWDatePicker:showYearView', this.bound_onShowYearView);

    const yearEl = this.yearComponent;
    if (yearEl) yearEl.removeEventListener('MDWDatePicker:yearChange', this.bound_yearChange);
  }
});
